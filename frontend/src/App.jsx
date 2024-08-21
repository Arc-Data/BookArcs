import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import DefaultLayout from "./layout/DefaultLayout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ScrollToTop from "./components/ScrollToTop"
import { AuthProvider } from "./context/AuthContext"
import BaseRoutes from "./routes/BaseRoutes"
import UserRoutes from "./routes/UserRoutes"
import UserLayout from "./layout/UserLayout"

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop/>
			<AuthProvider>
				<Routes>
					{/* Default Routes */}
					<Route element={<BaseRoutes/>}>
						<Route element={<DefaultLayout />}>
							<Route path="/" element={<Landing/>} />
							<Route path="/login" element={<Login/>}/>
							<Route path="/signup" element={<SignUp/>}/>
						</Route>
					</Route>
 					{/*  User authenticated routes */}
					<Route element={<UserRoutes />}>
						<Route element={<UserLayout />}>
							<Route path="/home" />
						</Route>
					</Route>
					{/* 404 path */}
					{/* <Route path="*" element={<Landing/>}></Route> */}
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
