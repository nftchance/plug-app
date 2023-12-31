import { PropsWithChildren, useRef } from "react"

import { DEBUG } from "@/lib/constants"
import { inBounds } from "@/lib/functions/math-utils"
import CanvasStore from "@/lib/store"

export type CanvasPosition = {
	id: string
	top: number
	left: number
	width?: number
	height?: number
}

export const Position = ({
	left,
	top,
	width,
	height,
	children
}: PropsWithChildren<CanvasPosition>) => {
	const ref = useRef<HTMLDivElement>(null)

	const screen = CanvasStore.screen

	width = width ?? 400
	height = height ?? 400

	if (
		!inBounds(
			{ left, top, width, height },
			{
				left: screen.x,
				top: screen.y,
				width: screen.width,
				height: screen.height
			}
		)
	)
		return null

	return (
		<div
			ref={ref}
			className="absolute inline-block"
			style={{
				left: `${left - screen.x}px`,
				top: `${top - screen.y}px`,
				width: `${width}px`,
				height: `${height}px`
			}}
		>
			{children}

			{DEBUG && (
				<div
					className="absolute rounded-sm bg-red-400 p-2 text-xs font-bold tabular-nums text-red-700"
					style={{
						top: "-60px",
						width: "max-content"
					}}
				>
					<p>
						{Math.round(left - screen.x)} x{" "}
						{Math.round(top - screen.y)} @ {width ?? 0} x{" "}
						{height ?? 0}
					</p>
				</div>
			)}
		</div>
	)
}
