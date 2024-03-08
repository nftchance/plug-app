"use client"

import { useCallback, useMemo, useState } from "react"

import { truncateAddress } from "@/lib/blockchain"

export default function useBlockchain() {
	const [address, setAddress] = useState("")

	const displayAddress = useMemo(() => truncateAddress(address), [address])

	const blockExplorer = useCallback((chainId: number) => {}, [address])

	const handleAddress = useCallback((address: string) => {
		setAddress(address)
	}, [])

	return { address, displayAddress, blockExplorer }
}
