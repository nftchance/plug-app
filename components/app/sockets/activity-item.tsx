import { FC, useMemo, useState } from "react"

import Image from "next/image"

import { AlertCircle, CheckCircle, ChevronRight, XCircle } from "lucide-react"

import { Button } from "@/components/buttons"
import { Counter } from "@/components/utils/Counter"
import { DateSince } from "@/components/utils/DateSince"
import { useFrame } from "@/contexts"
import { cn, colors } from "@/lib"
import { formatTitle } from "@/lib/functions"

import { Frame } from "../frames/base"

const getStatusIcon = (status: string) => {
	switch (status) {
		case "success":
			return (
				<div className="relative w-10">
					<div className="absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-plug-green blur-2xl filter" />
					<CheckCircle
						className="absolute top-1/2 h-6 w-6 -translate-y-1/2 text-center text-plug-green"
						size={16}
					/>
				</div>
			)
		case "error":
			return (
				<div className="relative w-10">
					<div className="bg-plug-red absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full blur-2xl filter" />
					<XCircle
						className="text-plug-red absolute top-1/2 h-6 w-6 -translate-y-1/2 text-center"
						size={16}
					/>
				</div>
			)
		case "warning":
			return (
				<div className="relative w-10">
					<div className="absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-yellow-300 blur-2xl filter" />
					<AlertCircle
						className="absolute top-1/2 h-6 w-6 -translate-y-1/2 text-center text-yellow-300"
						size={16}
					/>
				</div>
			)
		default:
			return <></>
	}
}

const Actions = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<Image
					src="/protocols/aave.png"
					alt="Aave"
					width={32}
					height={32}
					className="h-6 w-6"
				/>
				<p className="font-bold">
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						lend{" "}
					</span>
					rate for{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						ETH
					</span>{" "}
					is{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						greater than
					</span>{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						12%
					</span>
				</p>
			</div>
			<div className="flex items-center gap-4">
				<Image
					src="/protocols/uniswap.png"
					alt="Uniswap"
					width={32}
					height={32}
					className="h-6 w-6"
				/>
				<p className="font-bold">
					Swap{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						10,000
					</span>{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						USDC
					</span>{" "}
					for{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						2.5
					</span>{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						ETH
					</span>
				</p>
			</div>
			<div className="flex items-center gap-4">
				<Image
					src="/protocols/aave.png"
					alt="Aave"
					width={32}
					height={32}
					className="h-6 w-6"
				/>
				<p className="font-bold">
					Increase collateral in{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						ETH
					</span>{" "}
					with{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						2.5
					</span>{" "}
					<span
						style={{
							background: `linear-gradient(to right, rgba(0,239,54,0.1), rgba(147,223,0,0.1))`,
							color: `#00EF35`
						}}
						className="rounded px-2 py-1 font-bold"
					>
						ETH
					</span>
				</p>
			</div>
		</div>
	)
}

export const ActivityItem: FC<{
	text: string
	color: keyof typeof colors
	status: string
	time: string
}> = ({ text, status, time }) => {
	const [expanded, setExpanded] = useState(false)

	const icon = getStatusIcon(status)

	const pastDate = new Date(Date.now() - 60000 * 0.2)

	// const handleClick = () => {
	// 	handleFrameVisible(`activityDetails-${time}`)
	// }

	return (
		<>
			<button
				className="group group flex h-min w-full cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-[16px] border-[1px] border-grayscale-0 bg-white p-4 transition-all duration-200 ease-in-out hover:border-white hover:bg-grayscale-0"
				onClick={() => setExpanded(!expanded)}
			>
				<span className="flex w-full flex-row">
					{icon}
					<span className="flex flex-1 flex-col truncate text-left">
						<span className="font-bold">{text}</span>
						<span className="opacity-60">
							{formatTitle(status)}
						</span>
					</span>

					<span className="flex flex-col text-right">
						<span className="font-bold">
							<DateSince date={pastDate} />
						</span>
						<span className="opacity-60">
							{<Counter count={pastDate.toLocaleDateString()} />}
						</span>
					</span>
				</span>

				{expanded && (
					<span className="relative flex w-full flex-col gap-2 border-t-[1px] border-grayscale-100 pt-4 text-left">
						<Actions />

						<div className="flex flex-col gap-2">
							<p className="mt-4 flex font-bold">
								<span className="mr-auto opacity-40">
									Run On
								</span>

								<Image
									className="ml-[-20px] h-6 w-6"
									src={`/blockchain/ethereum.png`}
									alt={"Ethereum"}
									width={24}
									height={24}
								/>
							</p>
							<p className="flex">
								<span className="mr-auto font-bold opacity-40">
									Total
								</span>
								<div className="flex flex-row gap-2">
									<span className="flex flex-row items-center gap-2 opacity-60">
										<Counter count={0.00135} decimals={5} />{" "}
										ETH
									</span>
									<span className="flex flex-row font-bold">
										$<Counter count={6.11} />
									</span>
								</div>
							</p>
						</div>

						{/* {status === "success" && (
							<div className="mt-4 flex flex-row gap-2">
								<Button
									variant="secondary"
									className="w-max"
									onClick={() => {}}
								>
									Explorer
								</Button>
								<Button
									className="w-full"
									onClick={() => alert("shared")}
								>
									Share
								</Button>
							</div>
						)} */}
					</span>
				)}
			</button>
		</>
	)
}
