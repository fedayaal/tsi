import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

interface Errors {
	firstName: string
	lastName: string
	phone: string
	email: string
	password: string
	server: string
}

const validateEmail = (value: string): boolean =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validatePhone = (value: string): boolean => /^\+?\d{10,15}$/.test(value)

const Register = () => {
	const navigate = useNavigate()

	const [firstName, setFirstName] = useState<string>("")
	const [lastName, setLastName] = useState<string>("")
	const [phone, setPhone] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [role, setRole] = useState<"admin" | "user">("user")
	const [password, setPassword] = useState<string>("")

	const [errors, setErrors] = useState<Errors>({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		password: "",
		server: "",
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setErrors({
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			password: "",
			server: "",
		})

		const newErrors: Partial<Errors> = {}

		if (!firstName.trim()) {
			newErrors.firstName = "Имя обязательно"
		}
		if (!lastName.trim()) {
			newErrors.lastName = "Фамилия обязательна"
		}
		if (!phone.trim()) {
			newErrors.phone = "Телефон обязателен"
		} else if (!validatePhone(phone.trim())) {
			newErrors.phone = "Неверный формат телефона"
		}
		if (!email.trim()) {
			newErrors.email = "Email обязателен"
		} else if (!validateEmail(email.trim())) {
			newErrors.email = "Неверный формат почты"
		}
		if (!password) {
			newErrors.password = "Пароль обязателен"
		} else if (password.length < 6) {
			newErrors.password = "Пароль должен быть не менее 6 символов"
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors((prev) => ({ ...prev, ...newErrors }))
			return
		}

		try {
			await axios.post(
				"http://localhost:3000/api/register",
				{ firstName, lastName, phone, email, role, password },
				{ headers: { "Content-Type": "application/json" } }
			)
			navigate("/login")
		} catch (err: any) {
			const message =
				err.response?.data?.message ??
				"Не удалось зарегистрироваться. Попробуйте снова."
			setErrors((prev) => ({ ...prev, server: message }))
		}
	}

	const handleInputChange =
		(setter: (v: string) => void) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setter(e.target.value)

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-[40vw] bg-white p-6 rounded shadow-md"
			>
				<h1 className="text-2xl font-semibold mb-4">Регистрация</h1>

				{errors.server && (
					<div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
						{errors.server}
					</div>
				)}

				<div className="flex flex-col gap-4">
					<div>
						<Input
							type="text"
							placeholder="Имя"
							value={firstName}
							onChange={handleInputChange(setFirstName)}
						/>
						{errors.firstName && (
							<div className="mt-1 text-red-600 text-sm">
								{errors.firstName}
							</div>
						)}
					</div>

					<div>
						<Input
							type="text"
							placeholder="Фамилия"
							value={lastName}
							onChange={handleInputChange(setLastName)}
						/>
						{errors.lastName && (
							<div className="mt-1 text-red-600 text-sm">{errors.lastName}</div>
						)}
					</div>

					<div>
						<Input
							type="text"
							placeholder="Телефон"
							value={phone}
							onChange={handleInputChange(setPhone)}
						/>
						{errors.phone && (
							<div className="mt-1 text-red-600 text-sm">{errors.phone}</div>
						)}
					</div>

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

					<select
						value={role}
						onChange={handleInputChange((v) => setRole(v as "admin" | "user"))}
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="admin">Админ</option>
						<option value="user">Пользователь</option>
					</select>

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

					<Button type="submit">Зарегистрироваться</Button>

					<p className="text-sm text-gray-500">
						Уже есть аккаунт?{" "}
						<Link to="/login" className="text-blue-500 hover:underline">
							Войти
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Register
