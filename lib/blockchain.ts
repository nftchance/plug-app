import {
	base,
	baseSepolia,
	mainnet,
	optimism,
	optimismSepolia,
	sepolia
} from "wagmi/chains"

export const formatName = (name: string) => {
	return name
		.replace("Mainnet", "")
		.replace("Testnet", "")
		.replace("OP", "Optimism")
}

export const mainnets = [mainnet, base, optimism].map(chain => ({
	...chain,
	name: formatName(chain.name)
}))
export const testnets = [sepolia, baseSepolia, optimismSepolia].map(chain => ({
	...chain,
	name: formatName(chain.name)
}))
export const chains = [...mainnets, ...testnets].map(chain => ({
	...chain,
	name: formatName(chain.name)
}))

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

export const chainImage = (chainId: number) => {
	switch (chainId) {
		case 1:
			return "/blockchain/ethereum.png"
		case 11155111:
			return "/blockchain/ethereum.png"
		case 10:
			return "/blockchain/optimism.png"
		case 11155420:
			return "/blockchain/optimism.png"
		case 8453:
			return "/blockchain/base.png"
		case 84532:
			return "/blockchain/base.png"
		default:
			return "/blockchain/ethereum.png"
	}
}
