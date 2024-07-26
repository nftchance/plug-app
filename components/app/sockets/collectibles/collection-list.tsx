import { FC } from "react"

import { motion } from "framer-motion"

import { SocketCollectionItem } from "@/components"
import { useBalances } from "@/contexts"

export const SocketCollectionList: FC = () => {
	const { collectibles } = useBalances()

	if (!collectibles) return <></>

	return (
		<motion.div
			className="mb-24 flex flex-col gap-2"
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
		>
			{Object.keys(collectibles).map(collection => (
				<SocketCollectionItem
					key={collection}
					collection={collectibles[collection]}
				/>
			))}
		</motion.div>
	)
}