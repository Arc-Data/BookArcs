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
import AdminLogin from "./pages/AdminLogin"
import Home from "./pages/Home"
import AdminLayout from "./layout/AdminLayout"

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
						<Route path="/login/admin" element={<AdminLogin/>}/>
					</Route>
 					{/*  User authenticated routes */}
					<Route element={<UserRoutes />}>
						<Route element={<AdminLayout />}>
							<Route path="/home" element={<Home/>}/>
						</Route>
					</Route>
					{/* Admin authenticated routes */}
					{/* 404 path */}
					{/* <Route path="*" element={<Landing/>}></Route> */}
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
