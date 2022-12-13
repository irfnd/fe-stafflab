import * as yup from "yup";
import YupPassword from "yup-password";
import InputProps from "@/constants/InputProps";

YupPassword(yup);

// Input Props
const StatusPegawai = InputProps.StatusPegawai.map((el) => el.value);
const JenisKelamin = InputProps.JenisKelamin.map((el) => el.value);
const Agama = InputProps.Agama.map((el) => el.value);
const StatusPernikahan = InputProps.StatusPernikahan.map((el) => el.value);

export const LoginSchema = yup.object({
	email: yup.string().email("Email harus valid!").trim().required("Email wajib diisi!"),
	password: yup.string().trim().required("Password wajib diisi!"),
});

export const PegawaiSchema = yup.object({
	agama: yup.mixed().oneOf(Agama, "Pilih agama yang tertera!").required("Agama wajib diisi!"),
	akta: yup.mixed().required("Akta kelahiran wajib diisi!"),
	alamat: yup.string().trim().max(200, "Alamat harus berisi kurang dari 200 karakter!").required("Alamat wajib diisi!"),
	cv: yup.mixed().required("CV wajib diisi!"),
	divisi: yup.string().required("Divisi wajib diisi!"),
	email: yup.string().email("Email harus valid!").trim().required("Email wajib diisi!"),
	foto: yup.string().required("Foto wajib diisi!").typeError("Foto wajib diisi!"),
	instansi: yup.string().required("Instansi wajib diisi!"),
	jabatan: yup.string().required("Jabatan wajib diisi!"),
	jenisKelamin: yup.mixed().oneOf(JenisKelamin, "Pilih jenis kelamin yang tertera!").required("Jenis kelamin wajib diisi!"),
	kawin: yup.mixed().oneOf(StatusPernikahan, "Pilih status pernikahan yang tertera!").required("Status pernikahan wajib diisi!"),
	nama: yup.string().trim().max(150, "Nama harus berisi kurang dari 150 karakter!").required("Nama wajib diisi!"),
	nik: yup.number().required("NIK wajib diisi!").typeError("NIK wajib diisi!"),
	nip: yup.number().required("NIP wajib diisi!").typeError("NIP wajib diisi!"),
	noTelepon: yup.number().required("Nomor telepon wajib diisi!").typeError("Nomor telepon wajib diisi!"),
	skck: yup.mixed().required("Surat keterangan catatan kriminal wajib diisi!"),
	status: yup.mixed().oneOf(StatusPegawai, "Pilih status pegawai yang tertera!").required("Jenis Kelamin wajib diisi!"),
	suratKerja: yup.mixed().required("Surat persetujuan kerja wajib diisi!"),
	suratLamaran: yup.mixed().required("Surat Lamaran wajib diisi!"),
	suratSehat: yup.mixed().required("Surat keterangan sehat wajib diisi!"),
	tanggalLahir: yup.string().trim().required("Tanggal lahir wajib diisi!"),
	tempatLahir: yup.string().trim().max(20, "Tempat lahir harus berisi kurang dari 20 karakter!").required("Tempat lahir wajib diisi!"),
});

const validations = {
	LoginSchema,
	PegawaiSchema,
};

export default validations;
