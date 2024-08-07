import { FC, PropsWithChildren } from "react"

import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react"

import { SiweMessage } from "siwe"
import { useAccount, useChainId, useDisconnect, useSignMessage } from "wagmi"

import { useWeb3Modal } from "@web3modal/wagmi/react"

import { Button } from "@/components"

export type ButtonProps = {
	callbackUrl?: string
	redirect?: boolean
}

export const AuthButton: FC<PropsWithChildren<ButtonProps>> = ({
	callbackUrl = "/app/",
	redirect = true
}) => {
	const { open } = useWeb3Modal()

	const { address, isConnected } = useAccount()
	const chainId = useChainId()

	const { signMessageAsync, isLoading } = useSignMessage()

	const { data: session } = useSession()
	const { disconnect } = useDisconnect({
		mutation: {
			onSuccess: () => signOut({ callbackUrl: "/" })
		}
	})

	const handleLogin = async () => {
		if (!isConnected) {
			open()
			return
		}

		try {
			const message = new SiweMessage({
				domain: window.location.host,
				address,
				statement: `Access the Plug platform by proving your ownership of the address: ${address}.`,
				uri: window.location.origin,
				version: "1",
				chainId: chainId,
				nonce: await getCsrfToken()
			})
			const signature = await signMessageAsync({
				message: message.prepareMessage()
			})

			signIn("credentials", {
				message: JSON.stringify(message),
				redirect,
				signature,
				callbackUrl
			})
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
			{session?.address ? (
				<Button
					variant="destructive"
					className="w-full"
					onClick={() => disconnect()}
				>
					Logout
				</Button>
			) : (
				<Button className="w-full" onClick={handleLogin}>
					{isConnected
						? isLoading
							? "Signing Message..."
							: "Sign Message"
						: "Connect Wallet"}
				</Button>
			)}
		</>
	)
}

export default AuthButton
