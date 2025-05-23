import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { Input } from "../components/Input"
import type { IPost } from "../interfaces/post"
import axios from "axios"
import { Helmet } from "react-helmet"

const Blog = () => {
	const [newPost, setNewPost] = useState<IPost>({ title: "", body: "" })
	const [data, setData] = useState<IPost[]>([])
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await axios.get("http://localhost:3000/api/data")

		setData(response.data.data)
	}

	const addPost = async () => {
		await axios.post("http://localhost:3000/api/data", newPost)
		fetchData()
	}

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Блог Pavlov Dmitry</title>
				<meta name="description" content="Блог Pavlov Dmitry" />
				<meta
					name="keywords"
					content="ТСИ, КФЕН, ИМИ, ИВТ-22-1, БЛОГ, ПАВЛОВ ДМИТРИЙ, О ПАВЛОВ ДМИТРИЙ И ЕГО БЛОГ"
				/>
			</Helmet>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="flex flex-col gap-3">
					<div className="text-2xl font-semibold">Создание поста</div>

					<Input
						value={newPost.title}
						onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
						placeholder="Название поста"
						label="Название поста"
					/>

					<Input
						value={newPost.body}
						onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
						placeholder="Содержание поста"
						label="Содержание поста"
					/>

					<Button
						onClick={() => {
							addPost()
							setIsModalOpen(false)
							setNewPost({ title: "", body: "" })
						}}
					>
						Создать
					</Button>
				</div>
			</Modal>
			<div className="flex flex-col gap-6">
				<div className="flex flex-row justify-between">
					<div className="text-2xl font-bold">Блог</div>

					<Button
						onClick={() => {
							setIsModalOpen(true)
						}}
					>
						Добавить
					</Button>
				</div>

				<div className="grid grid-cols-1 gap-5">
					{data.map((post, index) => (
						<div
							key={index}
							className="p-2 border rounded-lg flex flex-col gap-3"
						>
							<div className="font-semibold">{post.title}</div>
							<div className="">{post.body}</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Blog
