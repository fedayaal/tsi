import { Helmet } from "react-helmet"

const About = () => {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>О нас</title>
				<meta name="description" content="Страница обо мне" />
				<meta
					name="keywords"
					content="ТСИ, КФЕН, ИМИ, ИВТ-22-1, БЛОГ, ФЕДОРОВ АЙААЛ, БЛОГ ФЕДОРОВ АЙААЛ"
				/>
			</Helmet>
			<div>О нас</div>
		</>
	)
}

export default About
