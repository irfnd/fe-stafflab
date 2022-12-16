import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "@/helpers/hooks/useAuth";
import useInstansi from "@/helpers/hooks/useInstansi";
import useDivisi from "@/helpers/hooks/useDivisi";
import useStatusPegawai from "@/helpers/hooks/useStatusPegawai";
import useJabatan from "@/helpers/hooks/useJabatan";

// Page Component
import BaseLayout from "@/components/layouts/BaseLayout";
import ScrollToTop from "@/components/others/ScrollToTop";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/Home/Home";
import Aktif from "@/pages/Pegawai/Aktif";
import Magang from "@/pages/Pegawai/Magang";
import Outsourcing from "@/pages/Pegawai/Outsourcing";
import Tambah from "@/pages/Pegawai/Tambah";
import Instansi from "@/pages/Perusahaan/Instansi";
import Divisi from "@/pages/Perusahaan/Divisi";
import Jabatan from "@/pages/Perusahaan/Jabatan";
import StatusPegawai from "@/pages/Perusahaan/StatusPegawai";

export default function App() {
	const { session } = useAuth();

	useInstansi();
	useDivisi();
	useJabatan();
	useStatusPegawai();

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<BaseLayout session={session} />}>
					<Route index element={<Home />} />
					<Route path='/pegawai'>
						<Route index element={<Aktif />} />
						<Route path='aktif' element={<Aktif />} />
						<Route path='outsourcing' element={<Outsourcing />} />
						<Route path='magang' element={<Magang />} />
						<Route path='tambah' element={<Tambah />} />
					</Route>
					<Route path='/perusahaan'>
						<Route index element={<Instansi />} />
						<Route path='instansi' element={<Instansi />} />
						<Route path='divisi' element={<Divisi />} />
						<Route path='jabatan' element={<Jabatan />} />
						<Route path='status-pegawai' element={<StatusPegawai />} />
					</Route>
				</Route>
				<Route path='/login' element={<Login session={session} />} />
			</Routes>
		</BrowserRouter>
	);
}
