import type { FC, PropsWithChildren } from "react"
import { useMemo, useState } from "react"

import { useBalance } from "wagmi"

import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import { truncateBalance } from "@/lib/blockchain"

export const Balance: FC<
	PropsWithChildren & { direction: number; action: string }
> = ({ direction, action }) => {
	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const { data } = useBalance({ address, chainId: 1 })
	const { decimals, symbol, value } = data ?? {}

	const [amount, setAmount] = useState<number>(0)

	const amountBigInt = useMemo(
		() =>
			BigInt(direction) *
			(amount ? BigInt(amount * 10 ** 18) : BigInt(0)),
		[amount]
	)

	const preBalance = useMemo(
		() => truncateBalance(value, decimals),
		[value, decimals]
	)

	const postBalance = useMemo(
		() =>
			truncateBalance(value ? value + amountBigInt : BigInt(0), decimals),
		[amountBigInt, value, decimals]
	)

	return (
		<div className="flex h-full flex-col">
			<div className="mb-4 flex flex-row items-center justify-center border-b-[1px] border-stone-950 hover:bg-stone-950">
				<Input
					name="amount"
					type="number"
					placeholder="AMOUNT"
					autoComplete="off"
					value={amount}
					step="0.01"
					min="0"
					onChange={e => setAmount(Number(e.target.value))}
					className="relative mb-auto w-full bg-transparent py-8 uppercase text-white outline-none"
				/>

				<p className="p-4 opacity-60">ETH</p>
			</div>

			<div className="mx-auto mt-auto flex w-full flex-col space-y-4">
				<p className="mx-auto flex flex-row items-center">
					{preBalance.toString()}{" "}
					<span className="ml-2 opacity-60">${symbol}</span>
					<ArrowRightIcon
						className="mx-4 opacity-60"
						width={16}
						height={16}
					/>
					{postBalance.toString()}{" "}
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
