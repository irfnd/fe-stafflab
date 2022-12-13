import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page Component
import BaseLayout from "@/components/layouts/BaseLayout";
import ScrollToTop from "@/components/others/ScrollToTop";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/Home/Home";
import Aktif from "@/pages/Pegawai/Aktif";
import Magang from "@/pages/Pegawai/Magang";
import Outsourcing from "@/pages/Pegawai/Outsourcing";
import Tambah from "@/pages/Pegawai/Tambah";

export default function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<BaseLayout />}>
					<Route index element={<Home />} />
					<Route path='/pegawai'>
						<Route index element={<Aktif />} />
						<Route path='aktif' element={<Aktif />} />
						<Route path='outsourcing' element={<Outsourcing />} />
						<Route path='magang' element={<Magang />} />
						<Route path='tambah' element={<Tambah />} />
					</Route>
				</Route>
				<Route path='/login' element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
