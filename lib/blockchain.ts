const BLOCK_EXPLORERS = {
	// ! Mainnets
	1: "https://etherscan.io",
	10: "https://optimistic.etherscan.io",
	8453: "https://sepolia.base.org",
	// ! Testnets
	11155111: "https://sepolia.etherscan.io",
	11155420: "https://sepolia-optimistic.etherscan.io",
	84532: "https://sepolia-explorer.base.org"
} as const

export const truncateAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const blockExplorerUrl = (chainId: keyof typeof BLOCK_EXPLORERS) => {
	return BLOCK_EXPLORERS[chainId]
}

export const blockExplorerAddress = (
	chainId: keyof typeof BLOCK_EXPLORERS,
	address: string
) => {
	return `${blockExplorerUrl(chainId)}/address/${address}`
}

export const blockExplorerTransaction = (
	chainId: keyof typeof BLOCK_EXPLORERS,
	tx: string
) => {
	return `${blockExplorerUrl(chainId)}/tx/${tx}`
}

export const blockExplorerBlock = (
	chainId: keyof typeof BLOCK_EXPLORERS,
	block: string
) => {
	return `${blockExplorerUrl(chainId)}/block/${block}`
}
