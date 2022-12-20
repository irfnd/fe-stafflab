import useAuth from "@/helpers/hooks/useAuth";
import useDivisi from "@/helpers/hooks/useDivisi";
import useInstansi from "@/helpers/hooks/useInstansi";
import useJabatan from "@/helpers/hooks/useJabatan";
import useStatusPegawai from "@/helpers/hooks/useStatusPegawai";
import useGolongan from "@/helpers/hooks/useGolongan";
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
import Divisi from "@/pages/Perusahaan/Divisi";
import Instansi from "@/pages/Perusahaan/Instansi";
import Jabatan from "@/pages/Perusahaan/Jabatan";
import StatusPegawai from "@/pages/Perusahaan/StatusPegawai";
import Golongan from "@/pages/Perusahaan/Golongan";
import ProfilePegawai from "@/pages/Pegawai/ProfilePegawai";

export default function App() {
	const { session } = useAuth();

	useInstansi();
	useDivisi();
	useJabatan();
	useStatusPegawai();
	useGolongan();

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<BaseLayout session={session} />}>
					<Route index element={<Home />} />
					<Route path='pegawai'>
						<Route index element={<Aktif />} />
						<Route path='aktif'>
							<Route index element={<Aktif />} />
							<Route path=':id' element={<ProfilePegawai />} />
						</Route>
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
						<Route path='golongan' element={<Golongan />} />
					</Route>
				</Route>
				<Route path='login' element={<Login session={session} />} />
			</Routes>
		</BrowserRouter>
	);
}
