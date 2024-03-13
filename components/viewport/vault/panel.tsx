import type { FC, PropsWithChildren } from "react"

import { useTabs } from "@/contexts"

import { Vault, Wallet } from "./actions/manage"

export const Panel: FC<PropsWithChildren> = () => {
	const { pane } = useTabs()

	return pane === "wallet" ? <Wallet /> : <Vault />
}

export default Panel
