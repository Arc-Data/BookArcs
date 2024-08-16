import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import DefaultLayout from "./layout/DefaultLayout"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<DefaultLayout/>}>
					<Route path="/" element={<Landing/>}></Route>
				</Route>
				{/* 404 path */}
				{/* <Route path="*" element={<Landing/>}></Route> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
