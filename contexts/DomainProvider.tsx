import type { FC, PropsWithChildren } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { useChainId } from "wagmi"

import { chains, mainnets, testnets } from "@/lib/blockchain"

type Domain = {
	testnets: boolean
	chain: (typeof chains)[number]
	isChoosing: boolean
}

const TESTNET_IDS: Array<number> = testnets.map(t => t.id)

const INITIAL_DOMAIN: Domain = {
	testnets: false,
	chain: chains[0],
	isChoosing: false
}

export const DomainContext = createContext<{
	accessible: (typeof chains)[number][]
	chainId: number
	domain: Domain
	handleDomain: (domain: Domain) => void
}>({
	accessible: chains,
	chainId: 1,
	domain: INITIAL_DOMAIN,
	handleDomain: () => {}
})

export const DomainProvider: FC<PropsWithChildren> = ({ children }) => {
	const chainId = useChainId()

	const [domain, setDomain] = useState<Domain>(INITIAL_DOMAIN)

	const accessible = useMemo(() => {
		if (TESTNET_IDS.includes(chainId)) return testnets

		if (domain.testnets) return chains

		return mainnets
	}, [domain])

	const handleDomain = (domain: Domain) => setDomain(domain)

	useEffect(() => {
		setDomain(domain => ({
			...domain,
			chain: chains.find(c => c.id === chainId) || chains[0]
		}))
	}, [chainId])

	return (
		<DomainContext.Provider
			value={{ accessible, chainId, domain, handleDomain }}
		>
			{children}
		</DomainContext.Provider>
	)
}

export const useDomain = () => useContext(DomainContext)
