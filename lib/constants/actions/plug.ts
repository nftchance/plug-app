import {
	ClockIcon,
	FuelIcon,
	GemIcon,
	HashIcon,
	InfinityIcon,
	SnowflakeIcon,
	Tally5Icon
} from "lucide-react"
import { parseAbi, zeroAddress } from "viem"

import { abis } from "../abis"

export const plug = {
	baseFee: {
		address: zeroAddress,
		abi: abis.plug.baseFee,
		inputs: parseAbi([abis.plug.baseFee])[0]["inputs"],
		options: undefined,
		sentence: "Base gas fee is {0} {1}",
		info: "Only allow this Plug to be executed when the base gas fee is greater or less than the value entered. This can be used to schedule future exectuions when gas is low.",
		icon: FuelIcon,
		primary: true
	},
	tokenBalance: {
		address: zeroAddress,
		abi: abis.plug.tokenBalance,
		inputs: parseAbi([abis.plug.tokenBalance])[0]["inputs"],
		options: undefined,
		sentence: "Balance of {1} is {2} {3}",
		info: "Only allow this Plug to be executed when the balance of the selected token is greater or lower than the value entered for the address entered. This can be used to auto-allocate funds that are recieved in this Socket or to act based on token changes in another address.",
		icon: GemIcon,
		primary: true
	},
	timestamp: {
		address: zeroAddress,
		abi: abis.plug.timestamp,
		inputs: parseAbi([abis.plug.timestamp])[0]["inputs"],
		options: undefined,
		sentence: "Timestamp is {0} {1}",
		info: "Only allow this Plug to be executed when the current time is before or after the value entered. This can be used to schedule a transaction to occur before or after a specified date and time.",
		icon: ClockIcon,
		primary: true
	},
	limitedCalls: {
		address: zeroAddress,
		abi: abis.plug.limitedCalls,
		inputs: parseAbi([abis.plug.limitedCalls])[0]["inputs"],
		options: undefined,
		sentence: "Can only be called {0} times",
		info: "Only allow this Plug to be executed a certain number of times before expiring. This can be used to execute a transaction a pre-determined amount of times.",
		icon: Tally5Icon,
		primary: true
	},
	cooldown: {
		address: zeroAddress,
		abi: abis.plug.cooldown,
		inputs: parseAbi([abis.plug.cooldown])[0]["inputs"],
		options: undefined,
		sentence: "Time between calls is at least {0}",
		info: "Only allow this Plug to be executed after a certain amount of time has passed since the last execution. This can be used to set up recurring transactions with a pre-determined gap of time between them.",
		icon: SnowflakeIcon
	},
	rateLimit: {
		address: zeroAddress,
		abi: abis.plug.rateLimit,
		inputs: parseAbi([abis.plug.rateLimit])[0]["inputs"],
		options: undefined,
		sentence: "Can only be called {0} times every {1}",
		info: "Control the frequency at which this Plug can be called. This can be used to set up a pre-determined number of recurring transactions with a pre-determined gap of time between them. ",
		icon: InfinityIcon
	},
	blockNumber: {
		address: zeroAddress,
		abi: abis.plug.blockNumber,
		options: undefined,
		inputs: parseAbi([abis.plug.blockNumber])[0]["inputs"],
		sentence: "Block number must be {0} {1}",
		info: "Only allow this Plug to be executed when the block number is greater or lower the value entered. This is an advanced feature, you may prefer to use the timestamp condition.",
		icon: HashIcon
	}
} as const

export default plug