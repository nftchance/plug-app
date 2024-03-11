import type { FC, PropsWithChildren } from "react"
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from "react"

import { useChainId, useBalance as useNativeBalance } from "wagmi"

import { api } from "@/lib/api"
import { truncateBalance } from "@/lib/blockchain"
import { Search } from "@/lib/types/balances"

const INITIAL_SEARCH: Search = {
	query: "",
	isSearching: false,
	asset: undefined
}

export const BalancesContext = createContext<{
	search: Search
	handleSearch: (search: Search) => void
}>({ search: INITIAL_SEARCH, handleSearch: () => {} })

export const BalancesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [search, setSearch] = useState<Search>(INITIAL_SEARCH)

	const handleSearch = useCallback((search: Search) => setSearch(search), [])

	return (
		<BalancesContext.Provider
			value={{
				search,
				handleSearch
			}}
		>
			{children}
		</BalancesContext.Provider>
	)
}

export const useBalances = ({
	address,
	direction,
	amount
}: {
	address: `0x${string}`
	direction?: 1 | -1
	amount?: number
}) => {
	const { search, handleSearch } = useContext(BalancesContext)

	const chainId = useChainId()

	const { data } = useNativeBalance({ address, chainId })
	const {
		decimals: nativeDecimals,
		symbol: nativeSymbol,
		value: nativeValue
	} = data ?? {}

	const { data: balances } = api.account.balances.useQuery(address)

	const decimals = useMemo(() => {
		if (search.asset) return search.asset.decimals

		return nativeDecimals
	}, [search.asset, nativeSymbol])

	const symbol = useMemo(() => {
		if (search.asset) return search.asset.symbol

		return nativeSymbol
	}, [search.asset, nativeSymbol])

	const value = useMemo(() => {
		// TODO: This needs to be implemented.
		// if (search.asset) return search.asset.value

		return nativeValue
	}, [search.asset, nativeSymbol])

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

	return {
		chainId,
		address,
		symbol,
		decimals,
		search,
		preBalance,
		postBalance,
		balances,
		handleSearch
	}
}
