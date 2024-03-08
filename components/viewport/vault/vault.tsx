import { FC, PropsWithChildren } from "react"

import { Panel, Selector, Toggler, Wallet } from "@/components/viewport/vault"
import { useTabs } from "@/contexts"

interface VaultComponent extends FC<PropsWithChildren> {
	Selector: typeof Selector
	Toggler: typeof Toggler
	Wallet: typeof Wallet
}

export const Vault: VaultComponent = () => {
	const { expanded } = useTabs()

	return expanded ? (
		<div className="relative h-screen bg-stone-900 text-white">
			<Panel />
		</div>
	) : null
}

Vault.Selector = Selector
Vault.Toggler = Toggler
Vault.Wallet = Wallet

export default Vault
