import { motion } from "framer-motion"

import { AuthButton, Button } from "@/components/buttons"
import { useSockets } from "@/contexts"

import { SocketItem } from "./socket-item"

export const SocketList = () => {
	const { address, sockets, handleAdd: handleSocketAdd } = useSockets()

	const hasSockets = sockets && sockets.length > 0

	return (
		<>
			{address === undefined ? (
				<div className="my-32 flex flex-col gap-[30px]">
					<p className="mx-auto w-[80%] max-w-[360px] text-center text-lg opacity-60">
						Step into Plug and get started by connecting your wallet
						to manage your Sockets and Plug in one place.
					</p>

					<AuthButton />
				</div>
			) : hasSockets ? (
				<motion.div
					className="flex flex-col gap-2"
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
					{sockets.map((socket, index) => (
						<motion.div
							key={index}
							variants={{
								hidden: { opacity: 0, y: 10 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										type: "spring",
										stiffness: 100,
										damping: 10
									}
								}
							}}
						>
							<SocketItem key={index} socket={socket} />
						</motion.div>
					))}
				</motion.div>
			) : (
				<div className="my-32 flex flex-col gap-[30px]">
					<p className="mx-auto w-[80%] max-w-[360px] text-center text-lg opacity-60">
						A Socket is needed to execute your first Plug. Create
						and fund your Socket with a single transaction now.
					</p>

					<Button className="mx-auto w-max" onClick={handleSocketAdd}>
						Create Socket
					</Button>
				</div>
			)}
		</>
	)
}