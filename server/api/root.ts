import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

import { plug } from "@/server/api/routers/plug"
import { socket } from "@/server/api/routers/socket"
import { createTRPCRouter } from "@/server/api/trpc"

import { misc } from "./routers/misc"

export const appRouter = createTRPCRouter({
	socket,
	plug,
	misc
})

export type AppRouter = typeof appRouter

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
