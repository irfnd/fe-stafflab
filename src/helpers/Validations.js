import InputProps from "@/constants/InputProps";
import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

// Input Props
const JenisKelamin = InputProps.JenisKelamin.map((el) => el.value);
const Agama = InputProps.Agama.map((el) => el.value);
const StatusPernikahan = InputProps.StatusPernikahan.map((el) => el.value);
const JenjangPendidikan = InputProps.JenjangPendidikan.map((el) => el.value);

export const LoginSchema = yup.object({
	email: yup.string().email("Email harus valid!").trim().required("Email wajib diisi!"),
	password: yup.string().trim().required("Password wajib diisi!"),
});

export const PegawaiSchema = yup.object({
	agama: yup.mixed().oneOf(Agama, "Pilih agama yang tertera!").required("Agama wajib diisi!"),
	akta: yup.mixed().required("Akta kelahiran wajib diisi!"),
	alamat: yup.string().trim().max(200, "Alamat harus berisi kurang dari 200 karakter!").required("Alamat wajib diisi!"),
	cv: yup.mixed().required("CV wajib diisi!"),
	divisi: yup.string().trim().required("Divisi wajib diisi!"),
	email: yup.string().email("Email harus valid!").trim().required("Email wajib diisi!"),
	foto: yup.mixed().required("Foto wajib diisi!").typeError("Foto wajib diisi!"),
	golongan: yup.string().trim().required("Golongan pegawai wajib diisi!"),
	instansi: yup.string().trim().required("Instansi wajib diisi!"),
	jabatan: yup.string().trim().required("Jabatan wajib diisi!"),
	jenisKelamin: yup.mixed().oneOf(JenisKelamin, "Pilih jenis kelamin yang tertera!").required("Jenis kelamin wajib diisi!"),
	kawin: yup.mixed().oneOf(StatusPernikahan, "Pilih status pernikahan yang tertera!").required("Status pernikahan wajib diisi!"),
	nama: yup.string().trim().max(150, "Nama harus berisi kurang dari 150 karakter!").required("Nama wajib diisi!"),
	nik: yup.number().required("NIK wajib diisi!").typeError("NIK wajib diisi!"),
	nip: yup.number().required("NIP wajib diisi!").typeError("NIP wajib diisi!"),
	noTelepon: yup.number().required("Nomor telepon wajib diisi!").typeError("Nomor telepon wajib diisi!"),
	skck: yup.mixed().required("Surat keterangan catatan kriminal wajib diisi!"),
	status: yup.string().default("1"),
	suratKerja: yup.mixed().required("Surat persetujuan kerja wajib diisi!"),
	suratLamaran: yup.mixed().required("Surat Lamaran wajib diisi!"),
	suratSehat: yup.mixed().required("Surat keterangan sehat wajib diisi!"),
	tanggalLahir: yup.string().trim().required("Tanggal lahir wajib diisi!"),
	tempatLahir: yup.string().trim().max(20, "Tempat lahir harus berisi kurang dari 20 karakter!").required("Tempat lahir wajib diisi!"),
	tipe: yup.string().trim().required("Tipe pegawai wajib diisi!"),
});

export const InstansiSchema = yup.object({
	nama: yup.string().trim().max(100, "Nama instansi harus berisi kurang dari 100 karakter!").required("Nama instansi wajib diisi!"),
	alamat: yup.string().trim().max(300, "Alamat instansi harus berisi kurang dari 300 karakter!").required("Alamat instansi wajib diisi!"),
});

export const DivisiSchema = yup.object({
	nama: yup.string().trim().max(100, "Nama divisi harus berisi kurang dari 100 karakter!").required("Nama divisi wajib diisi!"),
	idInstansi: yup.string().trim().required("Nama instansi wajib diisi!"),
});

export const JabatanSchema = yup.object({
	nama: yup.string().trim().max(100, "Nama jabatan harus berisi kurang dari 100 karakter!").required("Nama jabatan wajib diisi!"),
	idInstansi: yup.string().trim().required("Nama instansi wajib diisi!"),
	idDivisi: yup.string().trim().required("Nama divisi wajib diisi!"),
});

export const GolonganSchema = yup.object({
	nama: yup.string().trim().max(50, "Nama golongan harus berisi kurang dari 50 karakter!").required("Nama golongan wajib diisi"),
	keterangan: yup.string().trim().max(200, "Keterangan harus berisi kurang dari 200 karakter!").default(""),
});

export const IdentitasSchema = yup.object({
	nama: yup.string().trim().max(150, "Nama harus berisi kurang dari 150 karakter!").required("Nama wajib diisi!"),
	foto: yup.mixed(),
});

export const DataPribadiSchema = yup.object({
	nik: yup.number().required("NIK wajib diisi!").typeError("NIK wajib diisi!"),
	jenisKelamin: yup.mixed().oneOf(JenisKelamin, "Pilih jenis kelamin yang tertera!").required("Jenis kelamin wajib diisi!"),
	tanggalLahir: yup.string().trim().required("Tanggal lahir wajib diisi!"),
	tempatLahir: yup.string().trim().max(20, "Tempat lahir harus berisi kurang dari 20 karakter!").required("Tempat lahir wajib diisi!"),
	agama: yup.mixed().oneOf(Agama, "Pilih agama yang tertera!").required("Agama wajib diisi!"),
	kawin: yup.mixed().oneOf(StatusPernikahan, "Pilih status pernikahan yang tertera!").required("Status pernikahan wajib diisi!"),
	alamat: yup.string().trim().max(200, "Alamat harus berisi kurang dari 200 karakter!").required("Alamat wajib diisi!"),
});

export const DokumenSchema = {
	add: yup.object({
		nama: yup.string().trim().max(50, "Nama file dokumen harus berisi kurang dari 50 karakter!").required("Nama file Dokumen wajib diisi"),
		dokumen: yup.mixed().required("Dokumen wajib diisi!"),
	}),
	update: yup.object({
		nama: yup.string().trim().max(50, "Nama file dokumen harus berisi kurang dari 50 karakter!").required("Nama file Dokumen wajib diisi"),
		dokumen: yup.mixed(),
	}),
};

export const KontakSchema = yup.object({
	email: yup.string().email("Email harus valid!").trim().required("Email wajib diisi!"),
	noTelepon: yup.number().required("Nomor telepon wajib diisi!").typeError("Nomor telepon wajib diisi!"),
});

export const AkunResetPassword = yup.object({
	password: yup
		.string()
		.trim()
		.required("Password wajib diisi!")
		.min(8, "Password harus berisi minimal 8 karakter!")
		.minLowercase(1, "Password harus berisi minimal 1 huruf kecil!")
		.minUppercase(1, "Password harus berisi minimal 1 huruf kapital!")
		.minNumbers(1, "Password harus berisi minimal 1 nomor!")
		.minSymbols(1, "Password harus berisi minimal 1 simbol!"),
	confirm: yup
		.string()
		.trim()
		.required("Konfirmasi password wajib diisi!")
		.oneOf([yup.ref("password"), null], "Konfirmasi password tidak cocok!"),
});

export const PendidikanSchema = {
	add: yup.object({
		nama: yup.string().trim().max(100, "Nama instansi harus berisi kurang dari 100 karakter!").required("Nama instansi wajib diisi!"),
		jenjang: yup.mixed().oneOf(JenjangPendidikan, "Pilih jenjang yang tertera!").required("Jenjang wajib diisi!"),
		jurusan: yup.string().trim().max(150, "Jurusan harus berisi kurang dari 150 karakter!").required("Jurusan wajib diisi!"),
		tanggalMasuk: yup
			.number()
			.min(1000, "Masukan tahun masuk dengan benar!")
			.max(9999, "Masukan tahun masuk dengan benar!")
			.required("Tahun masuk wajib diisi!")
			.typeError("Tahun masuk wajib diisi!"),
		tanggalLulus: yup
			.number()
			.min(1000, "Masukan tahun lulus dengan benar!")
			.max(9999, "Masukan tahun lulus dengan benar!")
			.required("Tahun lulus wajib diisi!")
			.typeError("Tahun lulus wajib diisi!"),
		gelar: yup.string(),
		ijazah: yup.mixed().required("Ijazah wajib diisi!"),
		transkrip: yup.mixed().required("Transkrip wajib diisi!"),
	}),
	update: yup.object({
		nama: yup.string().trim().max(100, "Nama instansi harus berisi kurang dari 100 karakter!").required("Nama instansi wajib diisi!"),
		jenjang: yup.mixed().oneOf(JenjangPendidikan, "Pilih jenjang yang tertera!").required("Jenjang wajib diisi!"),
		jurusan: yup.string().trim().max(150, "Jurusan harus berisi kurang dari 150 karakter!").required("Jurusan wajib diisi!"),
		tanggalMasuk: yup
			.number()
			.min(1000, "Masukan tahun masuk dengan benar!")
			.max(9999, "Masukan tahun masuk dengan benar!")
			.required("Tahun masuk wajib diisi!")
			.typeError("Tahun masuk wajib diisi!"),
		tanggalLulus: yup
			.number()
			.min(1000, "Masukan tahun lulus dengan benar!")
			.max(9999, "Masukan tahun lulus dengan benar!")
			.required("Tahun lulus wajib diisi!")
			.typeError("Tahun lulus wajib diisi!"),
		gelar: yup.string(),
		ijazah: yup.mixed(),
		transkrip: yup.mixed(),
	}),
};

export default {
	LoginSchema,
	PegawaiSchema,
	InstansiSchema,
	DivisiSchema,
	JabatanSchema,
	DataPribadiSchema,
	DokumenSchema,
	KontakSchema,
	AkunResetPassword,
	PendidikanSchema,
};
