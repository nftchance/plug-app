import { FC, PropsWithChildren } from "react"

import { Deploy, Panel, Selector, Toggler } from "@/components/viewport/vault"
import { useTabs, useVaults } from "@/contexts"

interface VaultComponent extends FC<PropsWithChildren> {
	Selector: typeof Selector
	Toggler: typeof Toggler
}

export const Vault: VaultComponent = () => {
	const { expanded } = useTabs()

	const { vault } = useVaults()

	return expanded ? (
		<div className="relative h-screen bg-stone-900 text-white">
			{vault ? <Panel /> : <Deploy />}
		</div>
	) : null
}

Vault.Selector = Selector
Vault.Toggler = Toggler

export default Vault
