import { Alchemy, Network } from "alchemy-sdk"
import { formatUnits, hexToBigInt } from "viem"
import { z } from "zod"

import { TRPCError } from "@trpc/server"

import { TOKENS } from "@/lib/tokens"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { NetworkSchema } from "@/server/schemas"

// TODO: Right now we are making the assumption that it is on mainnet. Need to
//       go ahead and make sure that we also support other networks.
// TODO: Right now we only show tokens that we have in our official token list,
//       this should be updated so that users can import tokens that they may
//       need, but that we do not have metadata for.

const getChainId = (chain: Network) => {
	switch (chain) {
		case Network.ETH_MAINNET:
			return 1
		case Network.OPT_MAINNET:
			return 10
		default:
			return 1
	}
}

const getChainName = (chain: Network) => {
	switch (chain) {
		case Network.ETH_MAINNET:
			return "Ethereum"
		case Network.OPT_MAINNET:
			return "Optimism"
		default:
			return "Ethereum"
	}
}

const getBalancesForChain = async (address: string, chain: Network) => {
	const chainId = getChainId(chain)
	const chainName = getChainName(chain)

	const alchemy = new Alchemy({
		apiKey: process.env.ALCHEMY_API_KEY,
		network: chain
	})

	const { tokenBalances } = await alchemy.core.getTokenBalances(address)

	return tokenBalances
		.map(token => {
			const { contractAddress, tokenBalance } = token

			const staticToken = TOKENS.find(
				t =>
					t.address.toLowerCase() === contractAddress.toLowerCase() &&
					t.chainId === chainId
			)

			if (!staticToken || tokenBalance === null) return undefined

			const balance = Number(
				formatUnits(
					hexToBigInt(tokenBalance as `0x${string}`),
					staticToken.decimals
				)
			)

			return {
				address: contractAddress,
				chain: chainId,
				chainName,
				name: staticToken.name,
				symbol: staticToken.symbol,
				decimals: staticToken.decimals,
				logoURI: staticToken.logoURI,
				balance
			}
		})
		.filter(token => (token?.balance ?? 0) !== 0)
		.sort((a, b) => (b?.balance ?? 0) - (a?.balance ?? 0))
		.map(token => ({
			...token,
			balance: parseFloat(token?.balance?.toFixed(4) ?? "0")
		}))
}

const getBalances = async (
	address: string,
	chains: Array<Network> = [Network.ETH_MAINNET, Network.OPT_MAINNET]
) => {
	const balances = await Promise.all(
		chains.map(chain => getBalancesForChain(address, chain))
	)

	return balances.flat()
}

export default createTRPCRouter({
	// TODO: Only get balances for the networks that a vault is deployed on.
	balances: protectedProcedure.input(z.string()).query(async ({ input }) => {
		try {
			return await getBalances(input)
		} catch (e) {
			throw new TRPCError({ code: "BAD_REQUEST" })
		}
	})
})
