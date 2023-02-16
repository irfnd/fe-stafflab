import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useSelector } from "react-redux";

// Icons
import {
	Award,
	Building2,
	Cog,
	Factory,
	FilePlus,
	FileSearch2,
	Home,
	List,
	Luggage,
	Network,
	Pocket,
	UserCheck,
	UserCog,
	UserPlus,
	Users,
} from "lucide-react";

const mainRoutes = () => [
	{ path: "/", title: "Dashboard", breadcrumb: "Dashboard" },
	{ path: "/login", title: "Login" },
];

const pegawaiRoutes = (title) => [
	{ path: "/pegawai", title: "Pegawai Aktif", breadcrumb: "Pegawai" },
	{ path: "/pegawai/tambah", title: "Tambah Pegawai", breadcrumb: "Tambah" },
	{ path: "/pegawai/tetap", title: "Pegawai Tetap", breadcrumb: "Tetap", isIndex: true },
	{ path: "/pegawai/tetap/:id", title, breadcrumb: dynamicBreadcrumb },
	{ path: "/pegawai/outsourcing", title: "Pegawai Outsourcing", breadcrumb: "Outsourcing" },
	{ path: "/pegawai/outsourcing/:id", title, breadcrumb: dynamicBreadcrumb },
	{ path: "/pegawai/magang", title: "Pegawai Magang", breadcrumb: "Magang" },
	{ path: "/pegawai/magang/:id", title, breadcrumb: dynamicBreadcrumb },
];

const mutasiRoutes = (title, claims) =>
	claims && claims === "ADMIN"
		? [
				{ path: "/mutasi", title: "Mutasi Pegawai", breadcrumb: "Mutasi" },
				{ path: "/mutasi/tambah", title: "Tambah Mutasi", breadcrumb: "Tambah", isIndex: true },
				{ path: "/mutasi/tambah/:id", title, breadcrumb: dynamicBreadcrumb },
				{ path: "/mutasi/proses", title: "Proses Mutasi", breadcrumb: "Proses" },
				{ path: "/mutasi/list", title: "Riwayat Mutasi", breadcrumb: "Riwayat" },
		  ]
		: [
				{ path: "/mutasi", title: "Mutasi Pegawai", breadcrumb: "Mutasi" },
				{ path: "/mutasi/proses", title: "Proses Mutasi", breadcrumb: "Proses", isIndex: true },
				{ path: "/mutasi/list", title: "Riwayat Mutasi", breadcrumb: "Riwayat" },
		  ];

const cutiRoutes = (claims) =>
	claims && claims === "ADMIN"
		? [
				{ path: "/cuti", title: "Cuti Pegawai", breadcrumb: "Cuti" },
				{ path: "/cuti/pengajuan", title: "Pengajuan Cuti", breadcrumb: "Pengajuan", isIndex: true },
				{ path: "/cuti/list", title: "Riwayat Cuti", breadcrumb: "Riwayat" },
		  ]
		: [
				{ path: "/cuti", title: "Cuti Pegawai", breadcrumb: "Cuti" },
				{ path: "/cuti/list", title: "Riwayat Cuti", breadcrumb: "Riwayat", isIndex: true },
		  ];

const perusahaanRoutes = () => [
	{ path: "/perusahaan", title: "Instansi Perusahaan", breadcrumb: "Perusahaan" },
	{ path: "/perusahaan/instansi", title: "Instansi Perusahaan", breadcrumb: "Instansi", isIndex: true },
	{ path: "/perusahaan/divisi", title: "Divisi Perusahaan", breadcrumb: "Divisi" },
	{ path: "/perusahaan/jabatan", title: "Jabatan Perusahaan", breadcrumb: "Jabatan" },
	{ path: "/perusahaan/golongan", title: "Golongan Pegawai Perusahaan", breadcrumb: "Golongan" },
];

const dynamicBreadcrumb = ({ match }) => {
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, match.params.id));
	return pegawai?.nama;
};

export const BREADCRUMBS = (title, claims) => [
	...mainRoutes(),
	...pegawaiRoutes(title),
	...mutasiRoutes(title, claims),
	...cutiRoutes(claims),
	...perusahaanRoutes(),
];

export const SIDEBARS = (claims) => ({
	dashboard: { path: "/", name: "Dashboard", icon: Home },

	// Pegawai
	pegawai: claims &&
		claims === "ADMIN" && {
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
		children:
			claims && claims === "ADMIN"
				? [
						{ path: "/mutasi/tambah", name: "Tambah Mutasi", icon: FilePlus, isIndex: true },
						{ path: "/mutasi/proses", name: "Proses Mutasi", icon: FileSearch2 },
						{ path: "/mutasi/list", name: "Riwayat Mutasi", icon: List },
				  ]
				: [
						{ path: "/mutasi/proses", name: "Proses Mutasi", icon: FileSearch2, isIndex: true },
						{ path: "/mutasi/list", name: "Riwayat Mutasi", icon: List },
				  ],
	},

	// Cuti
	cuti: {
		path: "/cuti",
		name: "Cuti",
		icon: Luggage,
		children:
			claims && claims === "ADMIN"
				? [
						{ path: "/cuti/pengajuan", name: "Pengajuan Cuti", icon: FilePlus, isIndex: true },
						{ path: "/cuti/list", name: "Riwayat Cuti", icon: List },
				  ]
				: [{ path: "/cuti/list", name: "Riwayat Cuti", icon: List, isIndex: true }],
	},

	// Perusahaan
	perusahaan: claims &&
		claims === "ADMIN" && {
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
});
