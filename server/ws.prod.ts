import next from "next"

import { getSession } from "next-auth/react"

import { createServer } from "node:http"
import { parse } from "node:url"
import { WebSocketServer } from "ws"

import { applyWSSHandler } from "@trpc/server/adapters/ws"

import { appRouter } from "./api/root"
import { createInnerTRPCContext } from "./api/trpc"

const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

void app.prepare().then(() => {
	const server = createServer(async (req, res) => {
		if (!req.url) return
		const parsedUrl = parse(req.url, true)
		await handle(req, res, parsedUrl)
	})
	const wss = new WebSocketServer({ server })
	const handler = applyWSSHandler({
		wss,
		router: appRouter,
		createContext: async opts => {
			const session = await getSession(opts)

			return createInnerTRPCContext({
				session
			})
		}
	})

	process.on("SIGTERM", () => {
		console.log("SIGTERM")
		handler.broadcastReconnectNotification()
	})

	server.on("upgrade", (req, socket, head) => {
		wss.handleUpgrade(req, socket, head, ws => {
			wss.emit("connection", ws, req)
		})
	})

	server.listen(port)

	console.log(
		`> Server listening at http://localhost:${port} as ${
			dev ? "development" : process.env.NODE_ENV
		}`
	)
})
