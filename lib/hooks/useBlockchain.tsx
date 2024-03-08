"use client"

import { useCallback, useMemo, useState } from "react"

import {
	BLOCK_EXPLORERS,
	blockExplorerAddress,
	truncateAddress
} from "@/lib/blockchain"

export default function useBlockchain({ address }: { address: string }) {
	const displayAddress = useMemo(() => truncateAddress(address), [address])

	const blockExplorer = useCallback(
		(chainId: keyof typeof BLOCK_EXPLORERS) => {
			blockExplorerAddress(chainId, address)
		},
		[address]
	)

	return { address, displayAddress, blockExplorer }
}
