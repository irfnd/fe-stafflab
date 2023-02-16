import useAuth from "@/helpers/hooks/useAuth";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useClaims from "./helpers/hooks/useClaims";

// Page Component
import ScrollToTop from "@/components/others/ScrollToTop";
import Loading from "@/pages/Loading";

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
const Outsourcing = lazy(() => import("@/pages/Pegawai/Outsourcing"));
const PengajuanCuti = lazy(() => import("@/pages/Cuti/PengajuanCuti"));
const PilihMutasiPegawai = lazy(() => import("@/pages/Mutasi/PilihMutasiPegawai"));
const ProfilePegawai = lazy(() => import("@/pages/Pegawai/ProfilePegawai"));
const ProsesMutasi = lazy(() => import("@/pages/Mutasi/ProsesMutasi"));
const RiwayatMutasi = lazy(() => import("@/pages/Mutasi/RiwayatMutasi"));
const TambahMutasi = lazy(() => import("@/pages/Mutasi/TambahMutasi"));
const TambahPegawai = lazy(() => import("@/pages/Pegawai/TambahPegawai"));
const Tetap = lazy(() => import("@/pages/Pegawai/Tetap"));

export default function App() {
	const { session } = useAuth();
	const claims = useClaims();

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path='/' element={<BaseLayout session={session} />}>
						<Route index element={<Home />} />

						{claims && claims === "ADMIN" && (
							<Route path='pegawai'>
								<Route index element={<Tetap />} />
								<Route path='tetap'>
									<Route index element={<Tetap />} />
									<Route path=':id' element={<ProfilePegawai />} />
								</Route>
								<Route path='outsourcing'>
									<Route index element={<Outsourcing />} />
									<Route path=':id' element={<ProfilePegawai />} />
								</Route>
								<Route path='magang'>
									<Route index element={<Magang />} />
									<Route path=':id' element={<ProfilePegawai />} />
								</Route>
								<Route path='tambah' element={<TambahPegawai />} />
							</Route>
						)}

						{claims && claims === "ADMIN" ? (
							<Route path='mutasi'>
								<Route index element={<TambahMutasi />} />
								<Route path='tambah'>
									<Route index element={<TambahMutasi />} />
									<Route path=':id' element={<PilihMutasiPegawai />} />
								</Route>
								<Route path='proses' element={<ProsesMutasi />} />
								<Route path='list' element={<RiwayatMutasi />} />
							</Route>
						) : (
							<Route path='mutasi'>
								<Route index element={<ProsesMutasi />} />
								<Route path='proses' element={<ProsesMutasi />} />
								<Route path='list' element={<RiwayatMutasi />} />
							</Route>
						)}

						{claims && claims === "ADMIN" ? (
							<Route path='cuti'>
								<Route index element={<PengajuanCuti />} />
								<Route path='pengajuan' element={<PengajuanCuti />} />
								<Route path='list' element={<Cuti />} />
							</Route>
						) : (
							<Route path='cuti'>
								<Route index element={<Cuti />} />
								<Route path='list' element={<Cuti />} />
							</Route>
						)}

						{claims && claims === "ADMIN" && (
							<Route path='/perusahaan'>
								<Route index element={<Instansi />} />
								<Route path='instansi' element={<Instansi />} />
								<Route path='divisi' element={<Divisi />} />
								<Route path='jabatan' element={<Jabatan />} />
								<Route path='golongan' element={<Golongan />} />
							</Route>
						)}
					</Route>

					<Route path='login' element={<Login session={session} />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
