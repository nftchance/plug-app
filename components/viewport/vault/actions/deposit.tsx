import { FC, PropsWithChildren, useState } from "react"

import { Input } from "@/components/ui/input"

export const Deposit: FC<PropsWithChildren> = () => {
	const [amount, setAmount] = useState<number | undefined>(undefined)

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-center">
				<Input
					name="amount"
					type="number"
					placeholder="AMOUNT"
					autoComplete="off"
					value={amount}
					step="0.01"
					min="0"
					onChange={e => setAmount(Number(e.target.value))}
					className="relative mb-auto w-full bg-transparent py-8 uppercase text-white hover:bg-stone-950"
				/>

				<p className="p-4 opacity-60">ETH</p>
			</div>

			<button
				onClick={() => {}}
				className="text-md group pointer-events-auto mt-auto flex h-full h-min w-full items-center justify-center border-b-[1px] border-stone-950 bg-white p-4 text-stone-950 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
			>
				Submit
			</button>
		</div>
	)
}

export default Deposit
