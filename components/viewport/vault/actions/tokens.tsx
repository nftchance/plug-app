import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"

import { Network } from "alchemy-sdk"
import { motion } from "framer-motion"
import { LoaderCircleIcon } from "lucide-react"

// import { useChainId } from "wagmi"
import { api } from "@/lib/api"

// TODO: Right now we base everything on their mainnet balance irrespective
//       of the chain they are on. It should automatically map the proper
//       chain.
// TODO: When we click on a token on the list we should direct to the withdrawal
//       page with the token selected.

export const Tokens: FC<PropsWithChildren> = () => {
	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	// const chainId = useChainId()

	const { data: tokens } = api.account.balances.useQuery({
		address,
		chain: Network.ETH_MAINNET
	})

	const [index, setIndex] = useState(0)

	const dots = useMemo(() => {
		return {
			visible: 1 + (index % 3),
			hidden: 3 - (index % 3)
		}
	}, [index])

	useEffect(() => {
		if (tokens === undefined) return

		const interval = setInterval(() => {
			setIndex(prev => prev + 1)
		}, 500)

		return () => clearInterval(interval)
	}, [tokens])

	if (tokens === undefined)
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
			{tokens
				.filter(token => token?.symbol !== undefined)
				.map((token, index) => {
					if (token === undefined) return null

					return (
						<div
							key={index}
							className="flex h-min w-full flex-row items-center border-b-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
						>
							<img
								src={token.logoURI}
								alt={token.symbol}
								className="mr-4 h-5 w-5"
							/>
							{token.symbol}
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
