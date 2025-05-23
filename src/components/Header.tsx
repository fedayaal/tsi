import React, { FC, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Logo } from "./Logo"
import { Button } from "./Button"

interface User {
	firstName: string
	lastName: string
	phone: string
	email: string
	role: "admin" | "user"
}

export const Header: FC = () => {
	const [user, setUser] = useState<User | null>(null)
	const location = useLocation()

	useEffect(() => {
		const stored = localStorage.getItem("user")
		if (stored) {
			try {
				setUser(JSON.parse(stored))
			} catch {
				setUser(null)
			}
		} else {
			setUser(null)
		}
	}, [location])

	return (
		<header className="w-full h-16 px-8 py-4 bg-slate-300 flex items-center justify-between">
			<Link to="/">
				<Logo />
			</Link>

			<div className="flex items-center gap-6">
				<nav className="flex gap-3">
					<Link to="/">Главная</Link>
					<Link to="/about">О нас</Link>
					<Link to="/blog">Блог</Link>
				</nav>

				<div className="flex items-center gap-2">
					{user ? (
						<Link to="/profile">Профиль</Link>
					) : (
						<>
							<Link to="/register">
								<Button>Регистрация</Button>
							</Link>
							<Link to="/login">
								<Button>Вход</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
