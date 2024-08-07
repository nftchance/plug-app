import { FC, HTMLAttributes, useMemo } from "react"

import { motion, MotionProps } from "framer-motion"

import { SocketCollectionItem } from "@/components"
import { useBalances } from "@/contexts"
import { cn } from "@/lib"

export const SocketCollectionList: FC<
	HTMLAttributes<HTMLDivElement> & MotionProps & { id: string }
> = ({ id, className, ...props }) => {
	const { collectibles } = useBalances()

	const visibleCollectibles = useMemo(() => {
		if (collectibles === undefined) return Array(5).fill(undefined)

		return collectibles
	}, [, collectibles])

	return (
		<motion.div
			className={cn("mb-4 flex flex-col gap-2", className)}
			initial="hidden"
			animate="visible"
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: 0.05
					}
				}
			}}
			{...(props as MotionProps)}
		>
			{visibleCollectibles.map((collection, index) => (
				<SocketCollectionItem
					key={index}
					id={id}
					collection={collection}
				/>
			))}
		</motion.div>
	)
}
