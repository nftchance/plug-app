import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"

import Image from "next/image"

import { motion } from "framer-motion"
import { LoaderCircleIcon } from "lucide-react"

import { useBalances } from "@/contexts/BalancesProvider"

// TODO: Right now we base everything on their mainnet balance irrespective
//       of the chain they are on. It should automatically map the proper
//       chain.
// TODO: When we click on a token on the list we should direct to the withdrawal
//       page with the token selected.

export const Tokens: FC<PropsWithChildren> = () => {
	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const { balances } = useBalances({ address })

	const [index, setIndex] = useState(0)

	const dots = useMemo(() => {
		return {
			visible: 1 + (index % 3),
			hidden: 3 - (index % 3)
		}
	}, [index])

	useEffect(() => {
		if (balances === undefined) return

		const interval = setInterval(() => {
			setIndex(prev => prev + 1)
		}, 500)

		return () => clearInterval(interval)
	}, [balances])

	if (balances === undefined)
		return (
			<div className="flex flex-row items-center justify-center space-x-4 p-4 py-20">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{
						repeat: Infinity,
						duration: 2,
						ease: "linear"
					}}
					className="flex items-center justify-center tabular-nums opacity-60"
				>
					<LoaderCircleIcon className="h-4 w-4" />
				</motion.div>

				<p className="text-sm opacity-60">
					Loading tokens
					{Array(dots.visible).fill(".").join("")}
					<span className="text-stone-900">
						{Array(dots.hidden).fill(".").join("")}
					</span>
				</p>
			</div>
		)

	return (
		<>
			{balances
				.filter(token => token?.symbol !== undefined)
				.map((token, index) => {
					if (token === undefined) return null

					return (
						<div
							key={index}
							className="flex h-min w-full flex-row items-center border-b-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
						>
							<Image
								src={token.logoURI ?? ""}
								alt={token.symbol ?? ""}
								className="mr-4 h-6 w-6 rounded-full bg-white/20"
								width={16}
								height={16}
							/>
							<span className="flex flex-col">
								{token.symbol}
								<span className="text-xs opacity-60">
									{token.chainName}
								</span>
							</span>
							<span className="ml-auto opacity-60">
								{token.balance}
							</span>
						</div>
					)
				})}
		</>
	)
}

export default Tokens
