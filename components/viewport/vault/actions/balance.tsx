import type { FC, PropsWithChildren } from "react"
import { useCallback, useMemo, useState } from "react"

import { useBalance, useChainId } from "wagmi"

import { ArrowRightIcon, ChevronDownIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import { truncateBalance } from "@/lib/blockchain"
import useTokens from "@/lib/hooks/useTokens"
import { TOKENS } from "@/lib/tokens"

export const Balance: FC<
	PropsWithChildren & { direction: number; action: string }
> = ({ direction, action }) => {
	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const chainId = useChainId()

	const { data } = useBalance({ address, chainId })
	const { decimals, symbol, value } = data ?? {}

	const [asset, setAsset] = useState<(typeof TOKENS)[0] | undefined>(
		undefined
	)
	const [amount, setAmount] = useState<number>(0)

	const [search, setSearch] = useState("")
	const [isSearching, setIsSearching] = useState(false)

	const { tokens } = useTokens({
		chainId,
		address,
		tokenAddress: asset?.address
	})

	const amountBigInt = useMemo(() => {
		if (!decimals) return BigInt(0)

		return (
			BigInt(direction) *
			(amount ? BigInt(amount * 10 ** decimals) : BigInt(0))
		)
	}, [direction, amount])

	const preBalance = useMemo(
		() => truncateBalance(value, decimals),
		[value, decimals]
	)

	const postBalance = useMemo(
		() =>
			truncateBalance(value ? value + amountBigInt : BigInt(0), decimals),
		[amountBigInt, value, decimals]
	)

	const assetSymbol = useMemo(() => {
		if (asset) return asset.symbol

		return symbol
	}, [asset, symbol])

	const handleFind = useCallback((asset: (typeof TOKENS)[0]) => {
		setSearch("")
		setIsSearching(false)
		setAsset(asset)
	}, [])

	return (
		<div className="flex h-full flex-col">
			{/* 
				TODO: There is a small amount of spacing that is not being handled here
				      that is only visible when you hover on the amount input.
			*/}
			<div className="flex flex-row items-center justify-center border-b-[1px] border-stone-950">
				<Input
					name="amount"
					type="number"
					placeholder="AMOUNT"
					autoComplete="off"
					value={amount}
					step="0.01"
					min="0"
					onChange={e => setAmount(Number(e.target.value))}
					className="h-full w-full bg-transparent p-4 uppercase outline-none hover:bg-stone-950"
				/>

				<button
					onClick={() => setIsSearching(!isSearching)}
					className="pointer-events-auto flex h-full w-min flex-row items-center justify-center border-l-[1px] border-stone-950 bg-transparent p-4 transition-all duration-200 ease-in-out hover:bg-stone-950"
				>
					{assetSymbol}
					<ChevronDownIcon
						className="ml-4 opacity-60"
						width={16}
						height={16}
					/>
				</button>
			</div>

			{isSearching && (
				<div className="flex flex-col">
					<Input
						name="asset"
						type="text"
						placeholder={`TOKEN${
							tokens.length > 0 ? "NAME OR" : ""
						} ADDRESS`}
						autoComplete="off"
						value={search}
						onChange={e => setAmount(Number(e.target.value))}
						className="relative w-full border-b-[1px] border-stone-950 bg-transparent py-8 uppercase text-white outline-none hover:bg-stone-950"
					/>

					{tokens.length > 0 ?? (
						<div className="flex h-60 flex-col overflow-scroll">
							{tokens.map((asset, index) => (
								<button
									key={index}
									onClick={() => handleFind(asset)}
									className="flex h-full w-full flex-row items-center border-b-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
								>
									<img
										src={asset.logoURI}
										alt={asset.name}
										className="mr-4 h-5 w-5"
									/>
									{asset.symbol}
								</button>
							))}
						</div>
					)}
				</div>
			)}

			<div className="mx-auto mt-auto flex w-full flex-col">
				<p className="mx-auto my-4 flex flex-row items-center">
					{preBalance.toString()}{" "}
					<span className="ml-2 opacity-60">${assetSymbol}</span>
					<ArrowRightIcon
						className="mx-4 opacity-60"
						width={16}
						height={16}
					/>
					{postBalance.toString()}{" "}
					<span className="ml-2 opacity-60">${assetSymbol}</span>
				</p>

				<button
					onClick={() => {}}
					className="text-md group pointer-events-auto mt-auto h-full h-min w-full items-center justify-center border-b-[1px] border-stone-950 bg-white p-4 text-stone-950 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
				>
					Submit {action}
				</button>
			</div>
		</div>
	)
}

export default Balance
