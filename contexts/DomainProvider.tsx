import type { FC, PropsWithChildren } from "react"
import { createContext, useContext, useEffect, useState } from "react"

import { useChainId } from "wagmi"

import { chains } from "@/lib/blockchain"

type Domain = {
	chain: (typeof chains)[number]
	isChoosing: boolean
}

const INITIAL_DOMAIN: Domain = {
	chain: chains[0],
	isChoosing: false
}

export const DomainContext = createContext<{
	chainId: number
	domain: Domain
	handleDomain: (domain: Domain) => void
}>({ chainId: 1, domain: INITIAL_DOMAIN, handleDomain: () => {} })

export const DomainProvider: FC<PropsWithChildren> = ({ children }) => {
	const chainId = useChainId()

	const [domain, setDomain] = useState<Domain>(INITIAL_DOMAIN)

	const handleDomain = (domain: Domain) => setDomain(domain)

	// ? When the user changes chains in their wallet, update the domain.
	useEffect(() => {
		setDomain(domain => ({
			...domain,
			chain: chains.find(c => c.id === chainId) || chains[0]
		}))
	}, [chainId])

	return (
		<DomainContext.Provider value={{ chainId, domain, handleDomain }}>
			{children}
		</DomainContext.Provider>
	)
}

export const useDomain = () => useContext(DomainContext)
