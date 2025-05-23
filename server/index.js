import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const posts = [
	{ title: "Пост 1", body: "Содержание поста 1" },
	{ title: "Пост 2", body: "Содержание поста 2" },
	{ title: "Пост 3", body: "Содержание поста 3" },
	{ title: "Пост 4", body: "Содержание поста 4" },
	{ title: "Пост 5", body: "Содержание поста 5" },
]
const users = [] // { firstName, lastName, phone, email, role, passwordHash }

// Validation
const phoneRegex = /^\+?\d{10,15}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get("/api/data", (req, res) => {
	res.json({ data: posts })
})

app.post("/api/data", (req, res) => {
	const { title, body } = req.body

	if (!title || title.trim() === "") {
		return res.status(400).json({ message: "Название поста обязательно" })
	}
	if (!body || body.trim() === "") {
		return res.status(400).json({ message: "Содержимое поста обязательно" })
	}

	posts.push({ title, body })
	res.status(201).json({ message: "Успешно" })
})

app.post("/api/register", async (req, res) => {
	const { firstName, lastName, phone, email, role, password } = req.body

	if (!firstName || firstName.trim() === "") {
		return res.status(400).json({ message: "Имя обязательно" })
	}
	if (!lastName || lastName.trim() === "") {
		return res.status(400).json({ message: "Фамилия обязательна" })
	}
	if (!phone || !phoneRegex.test(phone)) {
		return res.status(400).json({ message: "Неверный формат телефона" })
	}
	if (!email || !emailRegex.test(email)) {
		return res.status(400).json({ message: "Неверный формат почты" })
	}
	if (role !== "admin" && role !== "user") {
		return res
			.status(400)
			.json({ message: "Роль должна быть 'admin' или 'user'" })
	}
	if (!password || password.length < 6) {
		return res
			.status(400)
			.json({ message: "Пароль обязателен и должен быть не менее 6 символов" })
	}

	if (users.find((u) => u.email === email)) {
		return res.status(400).json({ message: "Пользователь уже зарегистрирован" })
	}

	const passwordHash = await bcrypt.hash(password, 10)
	users.push({ firstName, lastName, phone, email, role, passwordHash })

	res.status(201).json({ message: "Регистрация прошла успешно" })
})

app.post("/api/login", async (req, res) => {
	const { email, password } = req.body

	if (!email || !emailRegex.test(email)) {
		return res.status(400).json({ message: "Неверный формат почты" })
	}
	if (!password || password.trim() === "") {
		return res.status(400).json({ message: "Пароль обязателен" })
	}

	const user = users.find((u) => u.email === email)
	if (!user) {
		return res.status(400).json({ message: "Пользователь не найден" })
	}

	const isMatch = await bcrypt.compare(password, user.passwordHash)
	if (!isMatch) {
		return res.status(400).json({ message: "Неверный пароль" })
	}

	res.json({
		message: "Авторизация прошла успешно",
		user: {
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			email: user.email,
			role: user.role,
		},
	})
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
