import type { FC, PropsWithChildren } from "react"

import { WagmiConfig } from "wagmi"

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"

import { chains } from "@/lib/blockchain"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || ""

const metadata = {
	name: "Plug",
	description: '"IF This, Then That" for Ethereum.',
	url: "https://onplug.io",
	icons: ["https://onplug.io/favicon.ico"]
}

const config = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig: config, projectId, chains })

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
	return <WagmiConfig config={config}>{children}</WagmiConfig>
}

export default WalletProvider
