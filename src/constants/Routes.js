import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useSelector } from "react-redux";
import { Award, Building2, Factory, Home, Network, Pocket, UserCheck, UserCog, UserPlus, Users, Cog, FilePlus, List } from "lucide-react";

const dynamicBreadcrumb = ({ match }) => {
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, match.params.id));
	return pegawai?.nama;
};

export const BREADCRUMBS = (title) => [
	{ path: "/", title: "Dashboard", breadcrumb: "Dashboard" },
	{ path: "/login", title: "Login" },

	// Pegawai
	{ path: "/pegawai", title: "Pegawai Aktif", breadcrumb: "Pegawai" },
	{ path: "/pegawai/tetap", title: "Pegawai Tetap", breadcrumb: "Tetap", isIndex: true },
	{ path: "/pegawai/tetap/:id", title, breadcrumb: dynamicBreadcrumb },
	{ path: "/pegawai/tambah", title: "Tambah Pegawai", breadcrumb: "Tambah" },
	{ path: "/pegawai/outsourcing", title: "Pegawai Outsourcing", breadcrumb: "Outsourcing" },
	{ path: "/pegawai/magang", title: "Pegawai Magang", breadcrumb: "Magang" },
	{ path: "/pegawai/magang/:id", title, breadcrumb: dynamicBreadcrumb },

	// Mutasi
	{ path: "/mutasi", title: "Mutasi Pegawai", breadcrumb: "Mutasi" },
	{ path: "/mutasi/tambah", title: "Tambah Mutasi", breadcrumb: "Tambah", isIndex: true },
	{ path: "/mutasi/tambah/:id", title, breadcrumb: dynamicBreadcrumb },
	{ path: "/mutasi/list", title: "Riwayat Mutasi", breadcrumb: "Riwayat" },

	// Perusahaan
	{ path: "/perusahaan", title: "Instansi Perusahaan", breadcrumb: "Perusahaan" },
	{ path: "/perusahaan/instansi", title: "Instansi Perusahaan", breadcrumb: "Instansi", isIndex: true },
	{ path: "/perusahaan/divisi", title: "Divisi Perusahaan", breadcrumb: "Divisi" },
	{ path: "/perusahaan/jabatan", title: "Jabatan Perusahaan", breadcrumb: "Jabatan" },
	{ path: "/perusahaan/golongan", title: "Golongan Pegawai Perusahaan", breadcrumb: "Golongan" },
];

export const SIDEBARS = {
	dashboard: { path: "/", name: "Dashboard", icon: Home },

	// Pegawai
	pegawai: {
		path: "/pegawai",
		name: "Pegawai",
		icon: Users,
		children: [
			{ path: "/pegawai/tambah", name: "Tambah", icon: UserPlus },
			{ path: "/pegawai/tetap", name: "Tetap", icon: Users, isIndex: true },
			{ path: "/pegawai/outsourcing", name: "Outsourcing", icon: UserCog },
			{ path: "/pegawai/magang", name: "Magang", icon: UserCheck },
		],
	},

	// Mutasi
	mutasi: {
		path: "/mutasi",
		name: "Mutasi",
		icon: Cog,
		children: [
			{ path: "/mutasi/tambah", name: "Tambah", icon: FilePlus, isIndex: true },
			{ path: "/mutasi/list", name: "Riwayat Mutasi", icon: List },
		],
	},

	// Perusahaan
	perusahaan: {
		path: "/perusahaan",
		name: "Perusahaan",
		icon: Factory,
		children: [
			{ path: "/perusahaan/instansi", name: "Instansi", icon: Building2, isIndex: true },
			{ path: "/perusahaan/divisi", name: "Divisi", icon: Network },
			{ path: "/perusahaan/jabatan", name: "Jabatan", icon: Award },
			{ path: "/perusahaan/golongan", name: "Golongan", icon: Pocket },
		],
	},
};
