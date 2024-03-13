import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"

import Image from "next/image"

import { motion } from "framer-motion"
import { LoaderCircleIcon } from "lucide-react"

import { useTabs } from "@/contexts"
import { useBalances } from "@/contexts/BalancesProvider"
import { useDomain } from "@/contexts/DomainProvider"
import { chainImage } from "@/lib/blockchain"
import { formatNumber } from "@/lib/utils"

// TODO: After updating the asset to be cleared when the domain changes, the redirect
//       to the withdraw and deposit panel do not represent the token anymore as it has
//       been cleared. This is a bug that needs to be fixed.
//		 NOTE: It actually appears to have been broken by something else, though I am not
//			   sure what else it could have been at this stage as it was just working
//			   as intended.

export const Tokens: FC<PropsWithChildren> = () => {
	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const { handlePane } = useTabs()
	const { domain, handleDomain } = useDomain()
	const { search, balances, handleSearch } = useBalances({
		chainId: domain.chain.id,
		address
	})

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
					// NOTE: Static reference to avoid Typescript bug where it thinks
					//		 chain is still undefined even though we checked for it above.
					const {
						chain,
						chainName,
						name,
						balance,
						symbol,
						logoURI,
						decimals
					} = token

					if (
						address === undefined ||
						name === undefined ||
						chain === undefined ||
						chainName === undefined ||
						symbol === undefined ||
						decimals === undefined
					)
						return null

					return (
						<button
							key={index}
							onClick={() => {
								handleDomain(chain)
								handleSearch({
									...search,
									asset: {
										address: token?.address ?? "",
										name,
										symbol,
										logoURI: logoURI ?? "",
										decimals,
										chainId: chain
									}
								})
								handlePane("withdraw")
							}}
							className="flex h-min w-full flex-row items-center border-b-[1px] border-stone-950 p-4 transition-all duration-200 ease-in-out hover:bg-stone-950 hover:text-white active:bg-white active:text-stone-950"
						>
							<Image
								src={logoURI ?? ""}
								alt={symbol}
								className="mr-4 h-6 w-6 rounded-full bg-white/20"
								width={16}
								height={16}
							/>
							<span className="flex flex-col items-start">
								{symbol}
								<span className="flex items-center justify-center">
									<Image
										src={chainImage(chain)}
										alt="Ethereum"
										className="mr-2 h-3 w-3 rounded-full"
										width={16}
										height={16}
									/>
									<span className="text-xs opacity-60">
										{chainName}
									</span>
								</span>
							</span>
							<span className="ml-auto opacity-60">
								{formatNumber(balance)}
							</span>
						</button>
					)
				})}
		</>
	)
}

export default Tokens
