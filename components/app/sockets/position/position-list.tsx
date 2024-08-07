import { FC, HTMLAttributes } from "react"

import { cn } from "@/lib"

export const SocketPositionList: FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn("flex min-h-[calc(100vh-200px)]", className)}
			{...props}
		>
			<div className="mx-auto my-auto flex h-full max-w-[80%] flex-col gap-2 text-center">
				<p className="text-lg font-bold">
					Position indexing is coming soon.
				</p>
				<p className="opacity-60">
					In a few days you will be able to see all of your DeFi
					positions here and manage them with a single unified
					interface.
				</p>
			</div>
		</div>
	)
}
