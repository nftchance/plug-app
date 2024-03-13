import type { FC, PropsWithChildren } from "react"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react"

import { VaultProvider } from "."
import { useChainId, useBalance as useNativeBalance } from "wagmi"

import { api } from "@/lib/api"
import { truncateBalance } from "@/lib/blockchain"
import { useBalance } from "@/lib/hooks/useBalance"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { Search } from "@/lib/types/balances"

import { DomainProvider } from "./DomainProvider"

const INITIAL_SEARCH: Search = {
	query: "",
	isSearching: false,
	asset: undefined
}

export const BalancesContext = createContext<{
	search: Search
	debouncedSearch: Search
	handleSearch: (search: Search) => void
}>({
	search: INITIAL_SEARCH,
	debouncedSearch: INITIAL_SEARCH,
	handleSearch: () => {}
})

export const BalancesProvider: FC<PropsWithChildren> = ({ children }) => {
	const {
		debounce: handleSearch,
		value: search,
		debounced: debouncedSearch
	} = useDebounce({ initial: INITIAL_SEARCH })

	return (
		<VaultProvider>
			<DomainProvider>
				<BalancesContext.Provider
					value={{
						search,
						debouncedSearch,
						handleSearch
					}}
				>
					{children}
				</BalancesContext.Provider>
			</DomainProvider>
		</VaultProvider>
	)
}

export const useBalances = ({
	chainId,
	address,
	direction,
	amount
}: {
	chainId: number
	address: `0x${string}`
	direction?: 1 | -1
	amount?: number
}) => {
	const { search, debouncedSearch, handleSearch } =
		useContext(BalancesContext)

	const { data } = useNativeBalance({ address, chainId })
	const {
		decimals: nativeDecimals,
		symbol: nativeSymbol,
		value: nativeValue
	} = data ?? {}

	const { metadata } = useBalance({
		chainId,
		tokenAddress: search.query || search?.asset?.address,
		address
	})

	const { data: balances } = api.account.balances.useQuery(address)

	const decimals = useMemo(() => {
		if (metadata) return metadata.decimals

		return nativeDecimals
	}, [metadata, search.asset, nativeSymbol])

	const symbol = useMemo(() => {
		if (metadata) return metadata.symbol

		return nativeSymbol
	}, [metadata, search.asset, nativeSymbol])

	const value = useMemo(() => {
		if (metadata) return metadata.balance

		return nativeValue
	}, [metadata, search.asset, nativeSymbol])

	const amountBigInt = useMemo(() => {
		if (!direction || !decimals) return BigInt(0)

		return (
			BigInt(direction) *
			(amount ? BigInt(amount * 10 ** decimals) : BigInt(0))
		)
	}, [direction, amount, decimals])

	const preBalance = useMemo(
		() => truncateBalance(value, decimals),
		[value, decimals]
	)

	const postBalance = useMemo(
		() =>
			truncateBalance(value ? value + amountBigInt : BigInt(0), decimals),
		[amountBigInt, value, decimals]
	)

	// NOTE: When the chain is changed, the asset being searched is no longer within
	//       context so we need to clear it to prevent the user from attempting to
	//       run a transaction for a token that does not actually exist.
	useEffect(() => {
		handleSearch({ ...search, asset: undefined })
	}, [chainId])

	return {
		chainId,
		address,
		symbol,
		decimals,
		search,
		debouncedSearch,
		preBalance,
		postBalance,
		balances,
		handleSearch
	}
}
