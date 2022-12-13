import { Home, UserCheck, UserCog, UserPlus, Users } from "lucide-react";

export const BREADCRUMBS = [
	{ path: "/", title: "Dashboard", breadcrumb: "Dashboard" },
	{ path: "/login", title: "Login" },
	{ path: "/pegawai", title: "Pegawai Aktif", breadcrumb: "Pegawai" },
	{ path: "/pegawai/aktif", title: "Pegawai Aktif", breadcrumb: "Aktif", isIndex: true },
	{ path: "/pegawai/outsourcing", title: "Pegawai Outsourcing", breadcrumb: "Outsourcing" },
	{ path: "/pegawai/magang", title: "Pegawai Magang", breadcrumb: "Magang" },
	{ path: "/pegawai/tambah", title: "Tambah Pegawai", breadcrumb: "Tambah" },
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
};
