import { FC, PropsWithChildren, useMemo } from "react"

import BlockiesSvg from "blockies-react-svg"
import { useAccount, useEnsName } from "wagmi"

import { CaretDownIcon } from "@radix-ui/react-icons"

import { useTabs } from "@/contexts"

export const Wallet: FC<PropsWithChildren> = () => {
	const { address } = useAccount()
	const { data: name } = useEnsName({ address })

	const { pane, handlePane } = useTabs()

	const displayAddress = useMemo(() => {
		if (!address) return "Connect Wallet"

		return address.slice(0, 6) + "..." + address.slice(-4)
	}, [address])

	const focused = pane === "wallet"

	return (
		<>
			<button
				onClick={() => handlePane(focused ? undefined : "wallet")}
				className="flex h-full flex-row items-center justify-center space-x-4 border-l-[1px] border-stone-950 px-8 text-sm text-white/60 hover:bg-stone-950"
			>
				{address ? (
					<BlockiesSvg
						size={8}
						scale={8}
						address={address}
						caseSensitive={true}
						className="mr-2 h-4 w-4 rounded-full"
					/>
				) : null}
				{name ?? displayAddress}
				<CaretDownIcon width={12} height={12} />
			</button>
		</>
	)
}

export default Wallet
