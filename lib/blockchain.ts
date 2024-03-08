import { ChainId } from "./types/blockchain"
import {
	base,
	baseSepolia,
	mainnet,
	optimism,
	optimismSepolia,
	sepolia
} from "wagmi/chains"

export const chains = [
	mainnet,
	sepolia,
	base,
	baseSepolia,
	optimism,
	optimismSepolia
]

export const formatName = (name: string) => {
	return name
		.replace("Mainnet", "")
		.replace("Testnet", "")
		.replace("OP", "Optimism")
}

export const truncateAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const truncateBalance = (
	value: BigInt | bigint | undefined,
	decimals: number | undefined
) => {
	if (!value || !decimals) return 0

	return (Number(value) / 10 ** Number(decimals)).toFixed(2)
}

export const blockExplorerUrl = (chainId: number) => {
	return chains.find(chain => chain.id === chainId)?.blockExplorers.default
		.url
}

export const blockExplorerAddress = (
	chainId: number,
	address: string | undefined
) => {
	if (!address) return ""
	return `${blockExplorerUrl(chainId)}/address/${address}`
}

export const blockExplorerTransaction = (
	chainId: number,
	tx: string | undefined
) => {
	if (!tx) return ""
	return `${blockExplorerUrl(chainId)}/tx/${tx}`
}

export const blockExplorerBlock = (
	chainId: number,
	block: string | undefined
) => {
	if (!block) return ""
	return `${blockExplorerUrl(chainId)}/block/${block}`
}
