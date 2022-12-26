import useAuth from "@/helpers/hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page Component
import BaseLayout from "@/components/layouts/BaseLayout";
import ScrollToTop from "@/components/others/ScrollToTop";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/Home/Home";
import Magang from "@/pages/Pegawai/Magang";
import Outsourcing from "@/pages/Pegawai/Outsourcing";
import ProfilePegawai from "@/pages/Pegawai/ProfilePegawai";
import Tambah from "@/pages/Pegawai/Tambah";
import Tetap from "@/pages/Pegawai/Tetap";
import Divisi from "@/pages/Perusahaan/Divisi";
import Golongan from "@/pages/Perusahaan/Golongan";
import Instansi from "@/pages/Perusahaan/Instansi";
import Jabatan from "@/pages/Perusahaan/Jabatan";

export default function App() {
	const { session } = useAuth();

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<BaseLayout session={session} />}>
					<Route index element={<Home />} />
					<Route path='pegawai'>
						<Route index element={<Tetap />} />
						<Route path='tetap'>
							<Route index element={<Tetap />} />
							<Route path=':id' element={<ProfilePegawai />} />
						</Route>
						<Route path='outsourcing' element={<Outsourcing />} />
						<Route path='magang'>
							<Route index element={<Magang />} />
							<Route path=':id' element={<ProfilePegawai />} />
						</Route>
						<Route path='tambah' element={<Tambah />} />
					</Route>
					<Route path='/perusahaan'>
						<Route index element={<Instansi />} />
						<Route path='instansi' element={<Instansi />} />
						<Route path='divisi' element={<Divisi />} />
						<Route path='jabatan' element={<Jabatan />} />
						<Route path='golongan' element={<Golongan />} />
					</Route>
				</Route>
				<Route path='login' element={<Login session={session} />} />
			</Routes>
		</BrowserRouter>
	);
}
