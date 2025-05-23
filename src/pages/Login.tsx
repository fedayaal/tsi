import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

interface LoginErrors {
	email: string
	password: string
	server: string
}

const validateEmail = (value: string): boolean =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const Login = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [role, setRole] = useState<"admin" | "user">("user")

	const [errors, setErrors] = useState<LoginErrors>({
		email: "",
		password: "",
		server: "",
	})

	const handleInputChange =
		(setter: (v: string) => void) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setter(e.target.value)
		}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		// сброс всех ошибок
		setErrors({ email: "", password: "", server: "" })

		const newErrors: Partial<LoginErrors> = {}

		if (!email.trim()) {
			newErrors.email = "Email обязателен"
		} else if (!validateEmail(email.trim())) {
			newErrors.email = "Неверный формат почты"
		}

		if (!password) {
			newErrors.password = "Пароль обязателен"
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors((prev) => ({ ...prev, ...newErrors }))
			return
		}

		try {
			const { data } = await axios.post(
				"http://localhost:3000/api/login",
				{ email, password, role },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			localStorage.setItem("user", JSON.stringify(data.user))
			navigate("/profile")
		} catch (err: any) {
			const serverMsg =
				err.response?.data?.message ||
				"Не удалось выполнить вход. Попробуйте снова."
			setErrors((prev) => ({
				...prev,
				server: serverMsg,
			}))
		}
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-[40vw] bg-white p-6 rounded shadow-md"
			>
				<h1 className="text-2xl font-semibold mb-4">Вход в систему</h1>

				{errors.server && (
					<div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
						{errors.server}
					</div>
				)}

				<div className="flex flex-col gap-4">
					<div>
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={handleInputChange(setEmail)}
						/>
						{errors.email && (
							<div className="mt-1 text-red-600 text-sm">{errors.email}</div>
						)}
					</div>

					<div>
						<Input
							type="password"
							placeholder="Пароль"
							value={password}
							onChange={handleInputChange(setPassword)}
						/>
						{errors.password && (
							<div className="mt-1 text-red-600 text-sm">{errors.password}</div>
						)}
					</div>

					<select
						value={role}
						onChange={handleInputChange((v) => setRole(v as "admin" | "user"))}
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="admin">Админ</option>
						<option value="user">Пользователь</option>
					</select>

					<Button type="submit">Войти</Button>

					<p className="text-sm text-gray-500">
						Нет аккаунта?{" "}
						<Link to="/register" className="text-blue-500 hover:underline">
							Зарегистрироваться
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Login
