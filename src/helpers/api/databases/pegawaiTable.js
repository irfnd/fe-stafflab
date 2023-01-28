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
		.single();
	if (error) throw error;
	return data;
};

export const updatePegawai = async (newData, nip) => {
	const { data, error } = await Supabase.from("pegawai").update(newData).eq("nip", nip).single();
	if (error) throw error;
	return data;
};

export default {
	getPegawaiById,
	getNewPegawai,
	createPegawai,
	updatePegawai,
};
