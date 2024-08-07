import type { FC } from "react"

import { useBalances } from "@/contexts"

const size = 14
const radius = 50
const circumference = 2 * Math.PI * radius
const viewbox = 120

const getDashArray = (percentage: number) => {
	const filledLength = (percentage / 100) * circumference
	const emptyLength = circumference - filledLength
	return `${filledLength} ${emptyLength}`
}

const getChainColor = (chain: string) => {
	switch (chain) {
		case "ethereum":
			return "#393939"
		case "optimism":
			return "#FF0420"
		case "base":
			return "#0052FF"
		default:
			return "#393939"
	}
}

export const SocketTokenPercentages: FC<{
	chains: NonNullable<
		ReturnType<typeof useBalances>["tokens"]
	>[number]["chains"]
}> = ({ chains }) => {
	let accumulatedPercentage = 0

	return (
		<svg width={size} height={size} viewBox={`0 0 ${viewbox} ${viewbox}`}>
			<g transform={`translate(${viewbox / 2},${viewbox / 2})`}>
				{chains.map((chain, index) => {
					const dashArray = getDashArray(chain.percentage)
					const rotation = (accumulatedPercentage / 100) * 360

					accumulatedPercentage += chain.percentage

					return (
						<circle
							key={index}
							r={radius}
							fill="transparent"
							stroke={getChainColor(chain.chain)}
							strokeWidth="20"
							strokeDasharray={dashArray}
							transform={`rotate(${-90 + rotation})`}
							style={{
								transition: "stroke-dasharray 3s ease 0s"
							}}
						/>
					)
				})}
			</g>
		</svg>
	)
}
