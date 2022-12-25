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
	} = newData;

	const { data, error } = await Supabase.from("pegawai")
		.insert({ nip, nama, email, noTelepon: `+62${noTelepon}`, idStatus, idInstansi, idDivisi, idJabatan, idGolongan })
		.select();

	if (error) throw error;
	return data[0];
};

export default {
	createPegawai,
};
