import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Layout from "./Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/blog" element={<Blog />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
