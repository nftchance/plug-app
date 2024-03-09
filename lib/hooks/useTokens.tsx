import { useMemo } from "react"

import { useContractReads } from "wagmi"
import { erc20ABI } from "wagmi"

import { TOKENS } from "@/lib/tokens"

// TODO: Even when there are no tokens in the static list, when an address is provided, it should
//       be added to the list so that the user can click it and confirm. We don't have a form submission
//       on searching for tokens, so instead we need to make sure that they still select it.

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

	const tokens = useMemo(() => {
		return TOKENS.filter(token => token.chainId === chainId)
	}, [chainId])

	const metadata = useMemo(() => {
		// TODO: Implement the recover of the metadata from the onchain read.
	}, [data])

	return { tokens }
}

export default useTokens
