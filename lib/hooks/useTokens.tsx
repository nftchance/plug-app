import { useMemo } from "react"

import { isAddress } from "viem"
import { useContractReads } from "wagmi"
import { erc20ABI } from "wagmi"

import { TOKENS } from "@/lib/tokens"

export const useTokens = ({
	chainId,
	tokenAddress,
	address
}: {
	chainId: number
	tokenAddress: string | undefined
	address: `0x${string}`
}) => {
	const typedAddress = tokenAddress as `0x${string}`

	// * This is only going to be able to retrieve information on the chain the client is connected to.
	const { data } = useContractReads({
		allowFailure: true,
		contracts: [
			{
				address: typedAddress,
				abi: erc20ABI,
				functionName: "name"
			},
			{
				address: typedAddress,
				abi: erc20ABI,
				functionName: "symbol"
			},
			{
				address: typedAddress,
				abi: erc20ABI,
				functionName: "decimals"
			},
			{
				address: typedAddress,
				abi: erc20ABI,
				functionName: "balanceOf",
				args: [address]
			}
		]
	})

	const metadata = useMemo(() => {
		const [name, symbol, decimals, balance] =
			(isAddress(typedAddress) && data) || []

		if (tokenAddress === undefined) return undefined

		// NOTE: Use the logoURI of a similar token in name -- This could end up being a bad decision, but
		//		 it improves the UX for the user. If they have a token that is not in the list, it will
		//		 still show up with a logo that exists on another chain.
		let logoURI = ""
		if (symbol?.result !== undefined) {
			const found = TOKENS.find(token => token.symbol === symbol.result)

			if (found) logoURI = found.logoURI
		}

		if (
			name?.result === undefined ||
			symbol?.result === undefined ||
			decimals?.result === undefined ||
			balance?.result === undefined
		)
			return undefined

		return {
			address: tokenAddress,
			name: name.result,
			symbol: symbol.result,
			decimals: decimals.result,
			balance: balance.result,
			chainId,
			logoURI
		}
	}, [chainId, typedAddress, tokenAddress, data])

	const tokens = useMemo(() => {
		const staticTokens = TOKENS.filter(token => token.chainId === chainId)
			.filter(token => {
				if (tokenAddress === undefined) return true

				if (isAddress(tokenAddress))
					return token.address === tokenAddress

				return (
					token.name
						.toLowerCase()
						.includes(tokenAddress.toLowerCase()) ||
					token.symbol
						.toLowerCase()
						.includes(tokenAddress.toLowerCase())
				)
			})
			.sort((a, b) => {
				if (tokenAddress === undefined) return 0
				if (isAddress(tokenAddress)) {
					if (a.symbol < b.symbol) return -1
					if (a.symbol > b.symbol) return 1
					return 0
				}

				if (a.symbol.length < b.symbol.length) return -1
				if (a.symbol.length > b.symbol.length) return 1
				return 0
			})

		if (metadata === undefined) return staticTokens

		return [metadata, ...staticTokens]
	}, [chainId, tokenAddress, metadata])

	return { tokens, metadata }
}

export default useTokens
