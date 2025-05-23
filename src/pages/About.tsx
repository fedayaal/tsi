import { Helmet } from "react-helmet"

const About = () => {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Обо мне</title>
				<meta name="description" content="Страница обо мне" />
				<meta
					name="keywords"
					content="ТСИ, КФЕН, ИМИ, ИВТ-22-1, БЛОГ, ПАВЛОВ ДМИТРИЙ, О ПАВЛОВЕ ДМИТРИЕ И ЕГО БЛОГЕ"
				/>
			</Helmet>
			<div>Обо мне</div>
		</>
	)
}

export default About
