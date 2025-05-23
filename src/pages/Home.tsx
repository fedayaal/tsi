import { Helmet } from "react-helmet"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

const Home = () => {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Главная страница блога Pavlov Dmitry</title>
				<meta
					name="description"
					content="Главная страница блога Pavlov Dmitry"
				/>
				<meta
					name="keywords"
					content="ТСИ, КФЕН, ИМИ, ИВТ-22-1, БЛОГ, ПАВЛОВ ДМИТРИЙ, ПАВЛОВ ДМИТРИЙ БЛОГ"
				/>
			</Helmet>
			<div>
				<div className="">Button</div>
				<div className="">Size</div>
				<Button size="small">Small</Button>
				<Button size="medium">Medium</Button>
				<Button size="large">Large</Button>
				<div className="">Color</div>
				<Button color="primary">Primary</Button>
				<Button color="secondary">Secondary</Button>

				<div className="">Input</div>
				<Input placeholder="Input" />
			</div>
		</>
	)
}

export default Home
