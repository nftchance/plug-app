import type { FC } from "react"

import Image from "next/image"

import { motion } from "framer-motion"

import { Container } from "@/components/landing/container"

export const Examples: FC = () => (
	<>
		<Container className="mt-[90px] flex-col items-center gap-4">
			<h2 className="text-center text-[28px] font-bold lg:w-[60%] lg:text-[64px] 2xl:w-[45%]">
				A framework that lets you plug-and-play.
			</h2>
			<p className="text-center text-[18px] font-light opacity-40 lg:w-[45%] lg:text-[24px]">
				Declare intents with a state of the art no-code plug builder in
				seconds. Combine the power of top protocols into a single
				transaction that are all simulatenously settled.
			</p>
		</Container>

		<div
			className="border-green my-[45px] border-y-[2px] lg:my-[90px]"
			style={{
				borderImage: "linear-gradient(45deg, #00EF35, #93DF00) 1"
			}}
		>
			<div className="grid lg:grid-cols-12 lg:grid-rows-2">
				<div className="lg:col-span-6">
					<div className="p-4 py-8 lg:p-12 lg:pl-96">
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 2
									}}
								>
									<p className="text-xs">1</p>
								</motion.div>
								<Image
									src="/protocols/plug.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Run{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										1
									</span>{" "}
									time a{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										year
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 0.5,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 2
									}}
								>
									<p className="text-xs">2</p>
								</motion.div>
								<Image
									src="/protocols/uniswap.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Can swap{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										100
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$USDC
									</span>{" "}
									to{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$ETH
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 1,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 2
									}}
								>
									<p className="text-xs">3</p>
								</motion.div>
								<Image
									src="/protocols/plug.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Has{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										0.2
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$ETH
									</span>{" "}
									or greater.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 1.5,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 2
									}}
								>
									<p className="text-xs">4</p>
								</motion.div>
								<Image
									src="/protocols/ens.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Can renew{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										nftchance.eth
									</span>{" "}
									.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className="flex border-t-[2px] lg:col-span-5 lg:col-start-7 lg:row-span-2 lg:border-l-[2px] lg:border-t-[0px] lg:pr-24"
					style={{
						borderImage:
							"linear-gradient(45deg, #00EF35, #93DF00) 1"
					}}
				>
					<div className="my-auto p-4 py-8 pr-0 lg:p-16 lg:pl-24">
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">1</p>
								</motion.div>
								<Image
									src="/protocols/plug.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Run{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										1
									</span>{" "}
									time a{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										day
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 0.5,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">2</p>
								</motion.div>
								<Image
									src="/protocols/plug.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Run after{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										10
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										PM
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										UTC
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 1,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">3</p>
								</motion.div>
								<Image
									src="/protocols/plug.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Run before{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										12/31/2024
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 1.5,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">4</p>
								</motion.div>
								<Image
									src="/protocols/uniswap.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Swap{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										36,000
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$USDC
									</span>{" "}
									to{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$ETH
									</span>
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 2,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">5</p>
								</motion.div>
								<Image
									src="/protocols/nouns.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Can bid with{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										9
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$ETH
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 2.5,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">6</p>
								</motion.div>
								<Image
									src="/protocols/nouns.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>Can bid without settling auction.</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 3,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 3.5
									}}
								>
									<p className="text-xs">7</p>
								</motion.div>
								<Image
									src="/protocols/nouns.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Bid on Noun with{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										Pineapple Hat
									</span>{" "}
									.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className="border-t-[2px] lg:col-span-6"
					style={{
						borderImage:
							"linear-gradient(45deg, #00EF35, #93DF00) 1"
					}}
				>
					<div className="p-4 py-8 lg:p-16 lg:pl-96">
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 1.5
									}}
								>
									<p className="text-xs">1</p>
								</motion.div>
								<Image
									src="/protocols/plug.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Run{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										1
									</span>{" "}
									time a{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										hour
									</span>{" "}
									.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 0.5,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 1.5
									}}
								>
									<p className="text-xs">2</p>
								</motion.div>
								<Image
									src="/protocols/yearn.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$USDC
									</span>{" "}
									pool is above{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										72%
									</span>{" "}
									APY.
								</p>
							</div>
							<div className="flex flex-row items-center gap-4">
								<motion.div
									className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9D9D9]/40"
									animate={{
										background: ["#EAEAEA", "#D9D9D9"]
									}}
									transition={{
										duration: 0.25,
										delay: 1,
										repeat: Infinity,
										repeatType: "reverse",
										repeatDelay: 1.5
									}}
								>
									<p className="text-xs">3</p>
								</motion.div>
								<Image
									src="/protocols/yearn.png"
									alt="Plug"
									width={24}
									height={24}
									className="rounded-full"
								/>
								<p>
									Can deposit{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										10,000
									</span>{" "}
									<span className="rounded-md bg-[#00EF35]/10 p-2 py-1 text-[#00EF35]">
										$USDC
									</span>{" "}
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
)