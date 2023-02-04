import useAuth from "@/helpers/hooks/useAuth";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page Component
import Loading from "@/pages/Loading";
import ScrollToTop from "@/components/others/ScrollToTop";

// Lazy Page Component
const BaseLayout = lazy(() => import("@/components/layouts/BaseLayout"));
const Cuti = lazy(() => import("@/pages/Cuti/Cuti"));
const Divisi = lazy(() => import("@/pages/Perusahaan/Divisi"));
const Golongan = lazy(() => import("@/pages/Perusahaan/Golongan"));
const Home = lazy(() => import("@/pages/Home/Home"));
const Instansi = lazy(() => import("@/pages/Perusahaan/Instansi"));
const Jabatan = lazy(() => import("@/pages/Perusahaan/Jabatan"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Magang = lazy(() => import("@/pages/Pegawai/Magang"));
const Mutasi = lazy(() => import("@/pages/Mutasi/Mutasi"));
const MutasiPegawai = lazy(() => import("@/pages/Mutasi/MutasiPegawai"));
const Outsourcing = lazy(() => import("@/pages/Pegawai/Outsourcing"));
const PengajuanCuti = lazy(() => import("@/pages/Cuti/PengajuanCuti"));
const ProfilePegawai = lazy(() => import("@/pages/Pegawai/ProfilePegawai"));
const TambahMutasi = lazy(() => import("@/pages/Mutasi/TambahMutasi"));
const TambahPegawai = lazy(() => import("@/pages/Pegawai/TambahPegawai"));
const Tetap = lazy(() => import("@/pages/Pegawai/Tetap"));

export default function App() {
	const { session } = useAuth();

	return (
		<BrowserRouter basename='/stafflab'>
			<ScrollToTop />
			<Suspense fallback={<Loading />}>
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

						<Route path='cuti'>
							<Route index element={<PengajuanCuti />} />
							<Route path='pengajuan' element={<PengajuanCuti />} />
							<Route path='list' element={<Cuti />} />
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
			</Suspense>
		</BrowserRouter>
	);
}
