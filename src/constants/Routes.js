import { Home, UserCheck, UserCog, UserPlus, Users, Building2, Network, Award, Factory, Pocket } from "lucide-react";

export const BREADCRUMBS = (dynamicBreadcrumb, title) => [
	{ path: "/", title: "Dashboard", breadcrumb: "Dashboard" },
	{ path: "/login", title: "Login" },
	// Pegawai
	{ path: "/pegawai", title: "Pegawai Aktif", breadcrumb: "Pegawai" },
	{ path: "/pegawai/aktif", title: "Pegawai Aktif", breadcrumb: "Aktif", isIndex: true },
	{ path: "/pegawai/aktif/:id", title, breadcrumb: dynamicBreadcrumb, isIndex: true },
	{ path: "/pegawai/tambah", title: "Tambah Pegawai", breadcrumb: "Tambah" },
	{ path: "/pegawai/outsourcing", title: "Pegawai Outsourcing", breadcrumb: "Outsourcing" },
	{ path: "/pegawai/magang", title: "Pegawai Magang", breadcrumb: "Magang" },
	{ path: "/pegawai/magang/:id", title, breadcrumb: dynamicBreadcrumb },
	// Perusahaan
	{ path: "/perusahaan", title: "Instansi Perusahaan", breadcrumb: "Perusahaan" },
	{ path: "/perusahaan/instansi", title: "Instansi Perusahaan", breadcrumb: "Instansi", isIndex: true },
	{ path: "/perusahaan/divisi", title: "Divisi Perusahaan", breadcrumb: "Divisi" },
	{ path: "/perusahaan/jabatan", title: "Jabatan Perusahaan", breadcrumb: "Jabatan" },
	{ path: "/perusahaan/golongan", title: "Golongan Pegawai Perusahaan", breadcrumb: "Golongan" },
];

export const SIDEBARS = {
	dashboard: { path: "/", name: "Dashboard", icon: Home },
	pegawai: {
		path: "/pegawai",
		name: "Pegawai",
		icon: Users,
		children: [
			{ path: "/pegawai/tambah", name: "Tambah", icon: UserPlus },
			{ path: "/pegawai/aktif", name: "Aktif", icon: Users, isIndex: true },
			{ path: "/pegawai/outsourcing", name: "Outsourcing", icon: UserCog },
			{ path: "/pegawai/magang", name: "Magang", icon: UserCheck },
		],
	},
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
