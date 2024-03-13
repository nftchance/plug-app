import type { FC, PropsWithChildren } from "react"
import { useState } from "react"

import Image from "next/image"

import {
	ArrowRightIcon,
	CheckIcon,
	ChevronDownIcon
} from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import { useBalances } from "@/contexts/BalancesProvider"
import { useDomain } from "@/contexts/DomainProvider"
import { chainImage, nativeAssetImage } from "@/lib/blockchain"
import { useTokens } from "@/lib/hooks/useTokens"
import { formatNumber } from "@/lib/utils"

// TODO: Balance changes with preBalance and postBalance do not function correctly when the
//       amount held is zero.
// TODO: Use the balance that the account holds as they got here through the useBalances() hook
//       otherwise the balance is safe to be assumed as zero.
// TODO: Implement ability to deposit tokens into vault from wallet and in vice versa.

export const Balance: FC<
	PropsWithChildren & { direction: 1 | -1; action: string }
> = ({ direction, action }) => {
	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const { accessible, chainId, domain, handleDomain } = useDomain()

	const [amount, setAmount] = useState<number>(0)

	const {
		search,
		debouncedSearch,
		symbol,
		preBalance,
		postBalance,
		handleSearch
	} = useBalances({
		chainId: domain.chain.id,
		address,
		direction,
		amount
	})

	const { all, tokens } = useTokens({
		chainId: domain.chain.id,
		address,
		query: debouncedSearch.query,
		asset: search?.asset
	})

	return (
		<div className="flex h-full flex-col">
			<button
				onClick={() =>
					handleDomain({
						...domain,
						isChoosing: !domain.isChoosing
					})
				}
				className="pointer-events-auto flex h-full w-full flex-row items-center justify-center border-b-[1px] border-stone-950 bg-transparent p-4 transition-all duration-200 ease-in-out hover:bg-stone-950"
			>
				<Image
					src={chainImage(domain.chain.id)}
					alt="Primary network"
					width={16}
					height={16}
					className="mr-2 h-4 w-4 rounded-full"
				/>
				{domain.chain.name}
				<ChevronDownIcon
					className="ml-auto opacity-60"
					width={16}
					height={16}
				/>
			</button>

			{domain.isChoosing && (
				<div className="flex max-h-60 flex-col overflow-scroll">
					{accessible.map((chain, index) => {
						if (chain.id === domain.chain.id) return null

						return (
							<button
								key={index}
								onClick={() =>
									handleDomain({
										...domain,
										chain,
										isChoosing: false
									})
								}
								className="flex h-min w-full flex-row items-center border-b-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white"
							>
								<Image
									src={chainImage(chain.id)}
									alt={chain.name}
									width={16}
									height={16}
									className="mr-2 h-4 w-4 rounded-full"
								/>

								{chain.name}

								{chain.id === chainId && (
									<CheckIcon
										className="ml-auto opacity-60"
										width={16}
										height={16}
									/>
								)}
							</button>
						)
					})}
				</div>
			)}

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
					onClick={() => {
						handleSearch({
							...search,
							isSearching: !search.isSearching
						})
					}}
					className="flex h-full flex-row items-center justify-center border-l-[1px] border-stone-950 bg-transparent p-4 transition-all duration-200 ease-in-out hover:bg-stone-950"
				>
					<Image
						src={
							search?.asset?.logoURI ?? nativeAssetImage(chainId)
						}
						alt={search?.asset?.name ?? ""}
						className="mr-4 rounded-full"
						width={16}
						height={16}
					/>
					{search?.asset?.symbol ?? symbol}
					<ChevronDownIcon
						className="ml-4 opacity-60"
						width={16}
						height={16}
					/>
				</button>
			</div>

			<div className="flex flex-col">
				{search.isSearching && (
					<>
						<Input
							name="asset"
							type="text"
							placeholder={`TOKEN${
								all.length > 0 ? " NAME OR" : ""
							} ADDRESS`}
							autoComplete="off"
							value={search.query}
							onChange={e => {
								handleSearch({
									...search,
									query: e.target.value
								})
							}}
							className="relative w-full border-b-[1px] border-stone-950 bg-transparent py-8 uppercase text-white outline-none hover:bg-stone-950"
						/>

						{tokens && tokens.length > 0 ? (
							<div className="flex max-h-60 flex-col overflow-scroll">
								{tokens.map((asset, index) => (
									<button
										key={index}
										onClick={() => {
											handleSearch({
												query: "",
												isSearching: false,
												asset
											})
										}}
										className="flex h-min w-full flex-row items-center border-b-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
									>
										<Image
											src={asset.logoURI}
											alt={asset.name}
											className="mr-4 h-5 w-5 rounded-full"
											width={16}
											height={16}
										/>
										{asset.symbol}
									</button>
								))}
							</div>
						) : null}
					</>
				)}
			</div>

			{/* TODO: Send to vault or withdraw to self maybe
			{direction == -1 && (
				<div className="flex flex-row items-center justify-center border-b-[1px] border-stone-950">
					<Input
						name="to"
						type="text"
						placeholder="TO"
						autoComplete="off"
						value={address}
						onChange={e => setAmount(Number(e.target.value))}
						className="h-full w-full bg-transparent p-4 uppercase outline-none hover:bg-stone-950"
					/>
				</div>
			)}*/}

			<div className="mx-auto mt-auto flex w-full flex-col">
				<p className="mx-auto my-4 flex flex-row items-center">
					<span className="tabular-nums">
						{formatNumber(preBalance)}{" "}
					</span>
					<span className="ml-2 opacity-60">${symbol}</span>
					<ArrowRightIcon
						className="mx-4 opacity-60"
						width={16}
						height={16}
					/>
					<span className="tabular-nums">
						{formatNumber(postBalance)}{" "}
					</span>
					<span className="ml-2 opacity-60">${symbol}</span>
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
