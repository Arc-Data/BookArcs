import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import DefaultLayout from "./layout/DefaultLayout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ScrollToTop from "./components/ScrollToTop"

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop/>
			<Routes>
				<Route element={<DefaultLayout/>}>
					<Route path="/" element={<Landing/>} />
					<Route path="/login" element={<Login/>}/>
					<Route path="/signup" element={<SignUp/>}/>
				</Route>
				{/* 404 path */}
				{/* <Route path="*" element={<Landing/>}></Route> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
