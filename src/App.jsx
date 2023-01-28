import useAuth from "@/helpers/hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page Component
import BaseLayout from "@/components/layouts/BaseLayout";
import ScrollToTop from "@/components/others/ScrollToTop";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/Home/Home";
import Mutasi from "@/pages/Mutasi/Mutasi";
import MutasiPegawai from "@/pages/Mutasi/MutasiPegawai";
import TambahMutasi from "@/pages/Mutasi/TambahMutasi";
import Magang from "@/pages/Pegawai/Magang";
import Outsourcing from "@/pages/Pegawai/Outsourcing";
import ProfilePegawai from "@/pages/Pegawai/ProfilePegawai";
import TambahPegawai from "@/pages/Pegawai/TambahPegawai";
import Tetap from "@/pages/Pegawai/Tetap";
import Divisi from "@/pages/Perusahaan/Divisi";
import Golongan from "@/pages/Perusahaan/Golongan";
import Instansi from "@/pages/Perusahaan/Instansi";
import Jabatan from "@/pages/Perusahaan/Jabatan";

export default function App() {
	const { session } = useAuth();

	return (
		<BrowserRouter basename='/stafflab'>
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
						<Route path='tambah' element={<TambahPegawai />} />
					</Route>

					<Route path='mutasi'>
						<Route index element={<TambahMutasi />} />
						<Route path='tambah'>
							<Route index element={<TambahMutasi />} />
							<Route path=':id' element={<MutasiPegawai />} />
						</Route>
						<Route path='list' element={<Mutasi />} />
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
