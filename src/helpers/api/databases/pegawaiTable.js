import Supabase from "@/helpers/Supabase";

export const getPegawaiById = async (nip) => {
	const results = await Supabase.from("pegawai").select("*").eq("nip", nip);
	return results;
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

export default {
	getPegawaiById,
	createPegawai,
	updatePegawai,
};
