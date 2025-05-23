import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />

			<div className="flex-1 px-8 py-6">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}

export default Layout
