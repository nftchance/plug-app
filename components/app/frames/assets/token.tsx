import { FC, useEffect, useMemo, useRef, useState } from "react"

import Image from "next/image"

import { Counter, Frame } from "@/components"
import { useBalances, useFrame } from "@/contexts"
import { cn, formatTitle, getAssetColor, getChainImage } from "@/lib"

import { TokenImage } from "../../sockets/tokens/token-image"
import { TokenPriceChart } from "./token-chart"

export const TokenFrame: FC<{ symbol: string }> = ({ symbol }) => {
	const { frameVisible } = useFrame()
	const { tokens } = useBalances()

	const [color, setColor] = useState("")

	const isFrame = frameVisible
		? frameVisible.split("-")[0] === "token" &&
			frameVisible.split("-")[1] === symbol
		: false

	const token = useMemo(
		() =>
			tokens &&
			tokens.find(token => token.symbol === symbol && token.name),
		[tokens, symbol]
	)

	if (token === undefined) return null

	return (
		<>
			<Frame
				icon={
					<div className="relative h-10 w-10">
						<TokenImage
							logo={token.logo}
							symbol={token.symbol}
							size="sm"
							handleColor={setColor}
						/>
					</div>
				}
				label={token.name}
				visible={isFrame}
				hasOverlay={true}
				hasChildrenPadding={false}
			>
				<>
					{/* <Image
						ref={imgRef}
						src={token.logo ?? ""}
						alt="Source"
						style={{ maxWidth: "300px" }}
						onLoad={() => setAverageColor(getAverageColor())}
						width={120}
						height={120}
					/> */}

					<div className="flex flex-col px-6">
						<p className="ml-auto flex w-max flex-row text-2xl font-bold">
							$
							<Counter count={token.chains[0].price} />
						</p>
						<p
							className={cn(
								"ml-auto w-max",
								token.chains[0].change === undefined
									? "opacity-60"
									: token.chains[0].change > 0
										? "text-plug-green"
										: "text-red-500"
							)}
						>
							<span className="flex flex-row items-center">
								{token.chains[0].change !== undefined ? (
									<>
										<Counter
											count={token.chains[0].change}
											decimals={2}
										/>
										%
									</>
								) : (
									"-"
								)}
							</span>
						</p>
					</div>

					<TokenPriceChart
						enabled={isFrame}
						chain={token.chains[0].chain}
						contract={token.chains[0].contract}
						color={color}
					/>

					<div className="mt-4 flex flex-row items-center justify-between border-t-[1px] border-grayscale-100 px-6 py-4 font-bold">
						<p className="mr-auto flex flex-col items-center">
							<span className="mr-auto opacity-40">Balance</span>
							<span className="mr-auto flex h-12 flex-row items-center gap-1 text-lg">
								<TokenImage
									logo={token.logo}
									symbol={token.symbol}
									size="xs"
								/>
								<Counter
									className="mr-1 w-max"
									style={{ color: color }}
									count={token.balance}
								/>
							</span>
						</p>
						<p className="ml-auto flex flex-col items-center text-center">
							<span className="ml-auto opacity-40">Value</span>
							<span className="mx-auto flex h-12 w-max items-center text-lg">
								$
								<Counter count={token.value} decimals={2} />
							</span>
						</p>
					</div>

					<div className="relative flex w-full flex-col gap-2 border-t-[1px] border-grayscale-100 px-6 py-8 text-lg">
						{token.chains.map((chain, index) => (
							<div
								key={index}
								className="flex flex-row items-center gap-4"
							>
								<Image
									src={getChainImage(chain.chain)}
									alt={chain.chain}
									className="h-4 w-4 rounded-full"
									width={16}
									height={16}
								/>

								<p className="mr-auto font-bold">
									{formatTitle(chain.chain)}
								</p>

								<p className="flex flex-col font-bold opacity-60">
									<Counter
										count={isFrame ? chain.balance : 0}
									/>
								</p>

								<p className="flex min-w-[72px] flex-row items-center text-right font-bold">
									<Counter
										count={isFrame ? chain.percentage : 0}
									/>
									%
								</p>
							</div>
						))}
					</div>
				</>
			</Frame>
		</>
	)
}