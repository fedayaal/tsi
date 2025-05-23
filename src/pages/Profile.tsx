import { useNavigate, Navigate } from "react-router-dom"
import { Button } from "../components/Button"

interface User {
	firstName: string
	lastName: string
	phone: string
	email: string
	role: "admin" | "user"
}

const Profile = () => {
	const navigate = useNavigate()

	const stored = localStorage.getItem("user")
	if (!stored) {
		return <Navigate to="/login" replace />
	}

	const user: User = JSON.parse(stored)

	const handleLogout = (): void => {
		localStorage.removeItem("user")
		navigate("/login")
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="w-full max-w-[40vw] p-6 rounded shadow-md">
				<h1 className="text-2xl font-semibold mb-6">Профиль</h1>
				<div className="flex flex-col gap-4 mb-6">
					<div>
						<span className="font-semibold">Имя: </span>
						{user.firstName}
					</div>
					<div>
						<span className="font-semibold">Фамилия: </span>
						{user.lastName}
					</div>
					<div>
						<span className="font-semibold">Email: </span>
						{user.email}
					</div>
					<div>
						<span className="font-semibold">Телефон: </span>
						{user.phone}
					</div>
					<div>
						<span className="font-semibold">Роль: </span>
						{user.role === "admin" ? "Администратор" : "Пользователь"}
					</div>
				</div>
				<Button
					onClick={handleLogout}
					className="w-full bg-red-500 hover:bg-red-600 transition text-white rounded p-2"
				>
					Выйти
				</Button>
			</div>
		</div>
	)
}

export default Profile
