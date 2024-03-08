import type { FC, PropsWithChildren } from "react"
import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { blockExplorerAddress, truncateAddress } from "@/lib/blockchain"

export const Deploy: FC<PropsWithChildren> = () => {
	const [amount, setAmount] = useState<number | undefined>(undefined)

	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const displayAddress = useMemo(() => truncateAddress(address), [address])

	const explorerUrl = useMemo(() => {
		return blockExplorerAddress(1, address)
	}, [address])

	return (
		<div className="flex w-[360px] flex-col text-center">
			<div className="space-y-4 py-16">
				<h1 className="mx-auto text-2xl">Deploy a Vault</h1>
				<p className="opacity-60">Network: Base</p>
			</div>

			<div className="space-y-4">
				<p>
					Address:{" "}
					<span className="opacity-60">
						<a target="_blank" href={explorerUrl}>
							{displayAddress}
						</a>
					</span>
				</p>

				<Input
					name="amount"
					type="number"
					placeholder="DEPOSIT AMOUNT"
					autoComplete="off"
					value={amount}
					step="0.01"
					min="0"
					onChange={e => setAmount(Number(e.target.value))}
					className="relative mb-auto w-full border-t-[1px] border-stone-950 bg-transparent py-8 uppercase text-white hover:bg-stone-950"
				/>

				<button
					onClick={() => {}}
					className={`text-md group pointer-events-auto mt-auto flex h-full h-min w-full items-center justify-center border-b-[1px] border-stone-950 bg-white p-4 text-stone-950 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950`}
				>
					Submit
				</button>
			</div>
		</div>
	)
}

export default Deploy
