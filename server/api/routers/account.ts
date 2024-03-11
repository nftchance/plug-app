import { Alchemy } from "alchemy-sdk"
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

export default createTRPCRouter({
	balances: protectedProcedure
		.input(
			z.object({
				address: z.string(),
				chain: NetworkSchema
			})
		)
		.query(async ({ input }) => {
			try {
				const alchemy = new Alchemy({
					apiKey: process.env.ALCHEMY_API_KEY,
					network: input.chain
				})

				const { tokenBalances } = await alchemy.core.getTokenBalances(
					input.address
				)

				return tokenBalances
					.map(token => {
						const { contractAddress, tokenBalance } = token

						const staticToken = TOKENS.find(
							t =>
								t.address.toLowerCase() ===
									contractAddress.toLowerCase() &&
								t.chainId === 1
						)

						if (!staticToken || tokenBalance === null)
							return undefined

						const balance = Number(
							formatUnits(
								hexToBigInt(tokenBalance as `0x${string}`),
								staticToken.decimals
							)
						)

						return {
							address: contractAddress,
							chain: 1,
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
						balance: token?.balance?.toFixed(4) ?? 0
					}))
			} catch (e) {
				throw new TRPCError({ code: "BAD_REQUEST" })
			}
		})
})
