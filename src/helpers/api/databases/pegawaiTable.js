import Supabase from "@/helpers/Supabase";

export const getPegawaiById = async (nip) => {
	const results = await Supabase.from("pegawai").select("*").eq("nip", nip);
	return results;
};

export const getNewPegawai = async () => {
	const { data, error } = await Supabase.from("pegawai").select("*").order("createdAt", { ascending: false }).range(0, 4);
	if (!error) return data;
	return null;
};

export const createPegawai = async (newData) => {
	const {
		nip,
		nama,
		email,
		noTelepon,
		tipe: idTipe,
		status: idStatus,
		instansi: idInstansi,
		divisi: idDivisi,
		jabatan: idJabatan,
		golongan: idGolongan,
		uuidUser,
	} = newData;
	const { data, error } = await Supabase.from("pegawai")
		.insert({ nip, nama, email, noTelepon: `+62${noTelepon}`, idTipe, idStatus, idInstansi, idDivisi, idJabatan, idGolongan, uuidUser })
		.select();
	if (error) throw error;
	return data[0];
};

export const updatePegawai = async (newData, nip) => {
	const { data, error } = await Supabase.from("pegawai").update(newData).eq("nip", nip).select();
	if (error) throw error;
	return data[0];
};

export const deletePegawai = async (nip) => {
	const { data: allFile } = await Supabase.from("dokumen").select("kategori, detail->path").eq("nipPegawai", nip);
	const listDokumen = allFile.filter((el) => el.kategori !== "profil").map((el) => el.path);
	const listFoto = allFile.filter((el) => el.kategori === "profil").map((el) => el.path);

	const { error: dokumenErr } = await Supabase.storage.from("dokumen").remove(listDokumen);
	if (dokumenErr) throw dokumenErr;

	const { error: fotoErr } = await Supabase.storage.from("foto").remove(listFoto);
	if (fotoErr) throw fotoErr;

	const { error: pegawaiErr } = await Supabase.from("pegawai").delete().eq("nip", nip);
	if (pegawaiErr) throw pegawaiErr;

	return true;
};

export default {
	getPegawaiById,
	getNewPegawai,
	createPegawai,
	updatePegawai,
	deletePegawai,
};
