import { Link } from "react-router-dom"
import { Logo } from "./Logo"

export const Footer = () => {
	return (
		<footer className="h-16 w-full px-8 py-4 flex flex-row items-center justify-between bg-slate-300">
			<Link to="/" className="">
				<Logo />
			</Link>

			<div className="">Федоров Айаал Б-ИВТ-22-1</div>
		</footer>
	)
}
