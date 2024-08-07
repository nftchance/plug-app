import axios from "axios"

import { OpenseaCollectible } from "@/lib/types"
import { db } from "@/server/db"

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const COLLECTION_CACHE_TIME = 24 * HOUR * 7
const COLLECTIBLES_CACHE_TIME = 10 * MINUTE

export const getAPIKey = () => {
	const keys = process.env.OPENSEA_API_KEY?.split(",")
	return keys?.[Math.floor(Math.random() * keys.length)]
}

export const getOpenseaCollection = async (slug: string, chain: string) => {
	const cachedCollection = await db.openseaCollection.findUnique({
		where: { slug }
	})

	const cache =
		cachedCollection &&
		cachedCollection.updatedAt >
			new Date(Date.now() - COLLECTION_CACHE_TIME)

	if (cache) return cachedCollection

	const response = await axios.get(
		`https://api.opensea.io/api/v2/collections/${slug}`,
		{
			headers: {
				Accept: "application/json",
				"x-api-key": getAPIKey()
			}
		}
	)

	const data = response.data

	const transformed = {
		collection: data.collection,
		name: data.name,
		description: data.description,
		imageUrl: data.image_url,
		bannerImageUrl: data.banner_image_url,
		owner: data.owner,
		category: data.category,
		isDisabled: data.is_disabled,
		isNsfw: data.is_nsfw,
		traitOffersEnabled: data.trait_offers_enabled,
		collectionOffersEnabled: data.collection_offers_enabled,
		openseaUrl: data.opensea_url,
		projectUrl: data.project_url,
		wikiUrl: data.wiki_url,
		discordUrl: data.discord_url,
		telegramUrl: data.telegram_url,
		twitterUsername: data.twitter_username,
		instagramUsername: data.instagram_username,
		totalSupply: data.total_supply,
		chain,
		createdAt: new Date(data.created_date)
	}

	return await db.openseaCollection.upsert({
		where: { slug },
		create: {
			slug,
			...transformed
		},
		update: {
			...transformed
		}
	})
}

export const getOpenseaCollectiblesForChain = async (
	address: string,
	chain: string,
	limit = 200,
	next?: string,
	collectibles: Array<OpenseaCollectible> = []
): Promise<Array<OpenseaCollectible>> => {
	const response = await axios.get(
		`https://api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts?limit=${limit}${next ? `&next=${next}` : ""}`,
		{
			headers: {
				Accept: "application/json",
				"x-api-key": getAPIKey()
			}
		}
	)

	const responseCollectibles = await Promise.all(
		response.data.nfts.map(async (collectible: OpenseaCollectible) => ({
			...collectible,
			collection: await getOpenseaCollection(
				collectible.collection as unknown as string,
				chain
			)
		}))
	)

	collectibles = [...collectibles, ...responseCollectibles]

	return response.data.next
		? getOpenseaCollectiblesForChain(
				address,
				chain,
				limit,
				response.data.next,
				collectibles
			)
		: collectibles
}

export const getCollectiblesForChain = async (
	address: string,
	chain: string,
	limit = 200,
	next?: string
) => {
	const cachedCollectibles = await db.openseaCollectibleCache.findUnique({
		where: { socketId_chain: { socketId: address, chain } },
		include: { collectibles: { include: { collection: true } } }
	})

	const cache =
		cachedCollectibles &&
		cachedCollectibles.updatedAt >
			new Date(Date.now() - COLLECTIBLES_CACHE_TIME)

	if (cache) return cachedCollectibles.collectibles

	const collectibles = await getOpenseaCollectiblesForChain(
		address,
		chain,
		limit,
		next
	)

	const transformed = collectibles.map((collectible: OpenseaCollectible) => ({
		identifier: collectible.identifier,
		collectionSlug: collectible.collection.slug,
		contract: collectible.contract,
		tokenStandard: collectible.token_standard,
		name: collectible.name,
		description: collectible.description,
		imageUrl: collectible.image_url,
		displayImageUrl: collectible.display_image_url,
		displayAnimationUrl: collectible.display_animation_url,
		metadataUrl: collectible.metadata_url,
		openseaUrl: collectible.opensea_url,
		updatedAt: new Date(collectible.updated_at),
		isDisabled: collectible.is_disabled,
		isNsfw: collectible.is_nsfw,
		owner: address
	}))

	const socket = await db.userSocket.findFirst({
		where: { socketAddress: address }
	})

	if (socket === null) return []

	await db.openseaCollectible.deleteMany({
		where: { owner: address, cacheChain: chain }
	})

	const collectiblesCache = await db.openseaCollectibleCache.upsert({
		where: { socketId_chain: { socketId: socket.id, chain } },
		create: {
			chain,
			socketId: socket.id,
			collectibles: {
				createMany: {
					data: transformed
				}
			}
		},
		update: {
			collectibles: {
				createMany: {
					data: transformed
				}
			}
		},
		include: { collectibles: { include: { collection: true } } }
	})

	return collectiblesCache.collectibles
}

export const getCollectibles = async (
	address: string,
	chains = ["ethereum", "optimism", "base"]
) => {
	const socket = await db.userSocket.findFirst({
		where: { socketAddress: address }
	})

	if (socket === null) return []

	await Promise.all(
		chains.map(async chain => await getCollectiblesForChain(address, chain))
	)

	return await db.openseaCollection.findMany({
		where: { collectibles: { some: { cacheSocketId: socket.id } } },
		include: {
			collectibles: {
				where: { cacheSocketId: socket.id },
				orderBy: { updatedAt: "desc" }
			}
		},
		orderBy: { createdAt: "desc" }
	})
}
