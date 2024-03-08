"use client"

import type { FC, PropsWithChildren } from "react"
import { createContext, useCallback, useContext, useState } from "react"

import { Vault } from "@/lib/types/vault"

export const VaultContext = createContext<{
	vault: Vault | undefined
	vaults: Array<Vault>
	handleVaultDeploy: (vault: Vault) => void
	handleVaultName: (name: string) => void
	handleVaultSelect: (vaultAddress: string) => void
}>({
	vault: undefined,
	vaults: [],
	handleVaultDeploy: () => {},
	handleVaultName: () => {},
	handleVaultSelect: () => {}
})

export const VaultProvider: FC<PropsWithChildren> = ({ children }) => {
	const [vault, setVault] = useState<Vault | undefined>(undefined)
	const [vaults, setVaults] = useState<Array<Vault>>([])

	// TODO: Wait to create the vault in the database until we've confirmed
	//       the deployment was successful onchain.
	const handleVaultDeploy = useCallback((vault: Vault) => {
		setVaults(vaults => [...vaults, vault])
	}, [])

	// TODO: Make this connected to the database.
	const handleVaultName = useCallback(
		(name: string) => {
			setVault(vault => {
				if (!vault) return vault

				vault.name = name

				return vault
			})
		},
		[vault]
	)

	// TODO: Update the active vault in the database so that it
	//		 is the same when they log in
	const handleVaultSelect = useCallback((vaultAddress: string) => {
		const vault = vaults.find(v => v.address === vaultAddress)

		setVault(vault)
	}, [])

	return (
		<VaultContext.Provider
			value={{
				vault,
				vaults,
				handleVaultDeploy,
				handleVaultName,
				handleVaultSelect
			}}
		>
			{children}
		</VaultContext.Provider>
	)
}

export const useVaults = () => useContext(VaultContext)
