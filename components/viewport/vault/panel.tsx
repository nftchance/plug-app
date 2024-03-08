import { FC, PropsWithChildren, useState } from "react"

import {
	ArchiveIcon,
	ArrowBottomLeftIcon,
	ArrowTopRightIcon,
	ListBulletIcon
} from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import {
	Activity,
	Deposit,
	Tokens,
	Withdraw
} from "@/components/viewport/vault/actions"
import { useVaults } from "@/contexts"

export const Panel: FC<PropsWithChildren> = () => {
	const { vault, handleVaultName } = useVaults()

	const [pane, setPane] = useState("tokens")

	return (
		<>
			<Input
				name="amount"
				type="text"
				placeholder="VAULT NAME"
				autoComplete="off"
				value={vault?.name ?? undefined}
				onChange={e => handleVaultName(e.target.value)}
				className="relative mb-auto w-full border-b-[1px] border-stone-950 bg-transparent py-8 uppercase text-white outline-none transition-all duration-200 ease-in-out hover:bg-stone-950"
			/>

			<div className="m-auto px-32 py-16 text-center text-white">
				<h1 className="flex flex-row text-4xl">
					23 <span className="ml-2 opacity-60">ETH</span>
				</h1>
				<h2 className="opacity-60">$86,480</h2>
			</div>

			<div className="w-full border-y-[1px] border-stone-950 text-center">
				<div className="flex flex-row border-b-[1px] border-stone-950">
					<button
						onClick={() => setPane("deposit")}
						className={`text-md group pointer-events-auto flex h-full w-1/2 items-center justify-center border-r-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950 ${
							pane === "deposit" ? "active" : ""
						}`}
					>
						<ArrowBottomLeftIcon
							className="mr-2 opacity-60"
							width={16}
							height={16}
						/>
						Deposit
					</button>

					<button
						onClick={() => setPane("withdraw")}
						className={`text-md group pointer-events-auto flex h-full w-1/2 items-center justify-center border-r-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950 ${
							pane === "withdraw" ? "active" : ""
						}`}
					>
						<ArrowTopRightIcon
							className="mr-2 opacity-60"
							width={16}
							height={16}
						/>
						Withdraw
					</button>
				</div>
				<div className="flex flex-row">
					<button
						onClick={() => setPane("tokens")}
						className={`text-md group pointer-events-auto flex h-full w-1/2 items-center justify-center border-r-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950 ${
							pane === "tokens" ? "active" : ""
						}`}
					>
						<ArchiveIcon
							className="mr-2 opacity-60"
							width={16}
							height={16}
						/>
						Tokens
					</button>

					<button
						onClick={() => setPane("activity")}
						className={`text-md group pointer-events-auto flex h-full w-1/2 items-center justify-center border-r-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950 ${
							pane === "activity" ? "active" : ""
						}`}
					>
						<ListBulletIcon
							className="mr-2 opacity-60"
							width={16}
							height={16}
						/>
						Activity
					</button>
				</div>
			</div>

			<div className="flex h-full w-full flex-col">
				{pane === "deposit" ? (
					<Deposit />
				) : pane === "withdraw" ? (
					<Withdraw />
				) : pane === "tokens" ? (
					<Tokens />
				) : pane === "activity" ? (
					<Activity />
				) : null}
			</div>
		</>
	)
}

export default Panel
