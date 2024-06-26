import { useEffect, useMemo } from "react"

import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { FileCog, FileTerminal } from "lucide-react"

import { formatNumber } from "@/lib/functions"
import { cn } from "@/lib/utils"

import { Header } from "../header"
import { ActivityList } from "./activity-list"

export const SocketActivity = () => {
	// TODO: Implement the backend functionality for this.
	// const activity = Array.from({ length: 7 }, () => Math.random())
	// hard coded values
	const activity = [0.5, 0.7, 0.1, 0.9, 0.4, 0.3, 0.9]

	const _pending = useMotionValue(0)
	const pending = useTransform(_pending, latest =>
		formatNumber(Math.round(latest))
	)

	const _run = useMotionValue(0)
	const run = useTransform(_run, latest => formatNumber(Math.round(latest)))

	const [start, end] = useMemo(
		() => [
			new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
				"en-US",
				{
					month: "numeric",
					day: "numeric"
				}
			),
			new Date().toLocaleDateString("en-US", {
				month: "numeric",
				day: "numeric"
			})
		],
		[]
	)

	useEffect(() => {
		return animate(_pending, 203).stop
	}, [_pending])

	useEffect(() => {
		return animate(_run, 1900).stop
	}, [_run])

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<div className="ml-auto mt-auto flex min-h-[124px] w-full flex-row gap-2">
						{activity.map((activity, index) => (
							<motion.div
								key={index}
								className={cn(
									"mt-auto w-full rounded-md",
									index === 6
										? "bg-gradient-to-tr from-[#00E100] to-[#A3F700]"
										: "bg-grayscale-100"
								)}
								initial={{
									height: "10px"
								}}
								animate={{
									height: `${Math.max(10, activity * 96)}px`
								}}
							/>
						))}
					</div>

					<div className="flex flex-row gap-2">
						<p className="opacity-40">{start}</p>
						<p className="ml-auto opacity-40">{end}</p>
					</div>
				</div>

				<div className="flex flex-row gap-2">
					<div className="w-full rounded-lg bg-grayscale-100 p-4">
						<motion.h4 className="text-2xl font-bold">
							{pending}
						</motion.h4>
						<p className="opacity-40">Pending</p>
					</div>
					<div className="w-full rounded-lg bg-grayscale-100 p-4">
						<motion.h4 className="text-2xl font-bold">
							{run}
						</motion.h4>
						<p className="opacity-40">Run</p>
					</div>
				</div>
			</div>

			<Header
				size="md"
				icon={<FileCog size={14} className="opacity-60" />}
				label="Runs"
			/>

			<ActivityList />
		</>
	)
}
