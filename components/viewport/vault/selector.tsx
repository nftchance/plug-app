import { FC, PropsWithChildren, useMemo } from "react"

import BlockiesSvg from "blockies-react-svg"

import { CaretDownIcon } from "@radix-ui/react-icons"

import { useTabs, useVaults } from "@/contexts"

export const Selector: FC<PropsWithChildren> = () => {
	const { expanded } = useTabs()
	const { vault } = useVaults()

	const address = "0x62180042606624f02d8a130da8a3171e9b33894d"

	const displayAddress = useMemo(() => {
		return address.slice(0, 6) + "..." + address.slice(-4)
	}, [address])

	return expanded ? (
		<>
			<p className="flex flex-row items-center justify-center space-x-4 px-8 text-sm text-white/60">
				<BlockiesSvg
					size={8}
					scale={8}
					address={address}
					caseSensitive={true}
					className="mr-2 h-4 w-4 rounded-full"
				/>
				{displayAddress}
				<CaretDownIcon width={12} height={12} />
			</p>
		</>
	) : null
}

export default Selector
