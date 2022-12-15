import { Home, UserCheck, UserCog, UserPlus, Users, Building2, Network, Award, Tags, Factory } from "lucide-react";

export const BREADCRUMBS = [
	{ path: "/", title: "Dashboard", breadcrumb: "Dashboard" },
	{ path: "/login", title: "Login" },
	// Pegawai
	{ path: "/pegawai", title: "Pegawai Aktif", breadcrumb: "Pegawai" },
	{ path: "/pegawai/aktif", title: "Pegawai Aktif", breadcrumb: "Aktif", isIndex: true },
	{ path: "/pegawai/tambah", title: "Tambah Pegawai", breadcrumb: "Tambah" },
	{ path: "/pegawai/outsourcing", title: "Pegawai Outsourcing", breadcrumb: "Outsourcing" },
	{ path: "/pegawai/magang", title: "Pegawai Magang", breadcrumb: "Magang" },
	// Perusahaan
	{ path: "/perusahaan", title: "Instansi Perusahaan", breadcrumb: "Perusahaan" },
	{ path: "/perusahaan/instansi", title: "Instansi Perusahaan", breadcrumb: "Instansi", isIndex: true },
	{ path: "/perusahaan/divisi", title: "Divisi Perusahaan", breadcrumb: "Divisi" },
	{ path: "/perusahaan/jabatan", title: "Jabatan Perusahaan", breadcrumb: "Jabatan" },
	{ path: "/perusahaan/status-pegawai", title: "Status Pegawai Perusahaan", breadcrumb: "Status Pegawai" },
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
			{ path: "/perusahaan/status-pegawai", name: "Status Pegawai", icon: Tags },
		],
	},
};
