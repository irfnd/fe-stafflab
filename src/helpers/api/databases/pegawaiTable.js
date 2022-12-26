import Supabase from "@/helpers/Supabase";

export const createPegawai = async (newData) => {
	const {
		nip,
		nama,
		email,
		noTelepon,
		status: idStatus,
		instansi: idInstansi,
		divisi: idDivisi,
		jabatan: idJabatan,
		golongan: idGolongan,
		uuidUser,
	} = newData;
	const { data, error } = await Supabase.from("pegawai")
		.insert({ nip, nama, email, noTelepon: `+62${noTelepon}`, idStatus, idInstansi, idDivisi, idJabatan, idGolongan, uuidUser })
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
	createPegawai,
	updatePegawai,
};
