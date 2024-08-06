import {
	PageActivity,
	PageDiscover,
	PageEarnings,
	PageHome,
	PageMine,
	PagePlug
} from "@/components"
import { usePage } from "@/contexts"

export const PageContent = () => {
	const { page } = usePage()

	switch (page.key) {
		case "home":
			return <PageHome />
		case "activity":
			return <PageActivity />
		case "discover":
			return <PageDiscover />
		case "mine":
			return <PageMine />
		case "plug":
			return <PagePlug />
		case "earnings":
			return <PageEarnings />
		default:
			return <></>
	}
}
