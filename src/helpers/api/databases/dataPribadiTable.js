import Supabase from "@/helpers/Supabase";

export const getDataPribadi = async (nip) => {
	const results = await Supabase.from("data_pribadi").select("*").eq("nipPegawai", nip);
	return results;
};

export const createDataPribadi = async (newData) => {
	const { nik, tempatLahir, tanggalLahir, jenisKelamin, agama, kawin, alamat, nipPegawai } = newData;
	const { data, error } = await Supabase.from("data_pribadi")
		.insert({ nik, tempatLahir, tanggalLahir, jenisKelamin, agama, kawin, alamat, nipPegawai })
		.single();
	if (error) throw error;
	return data;
};

export const updateDataPribadi = async (newData, nik) => {
	const { data, error } = await Supabase.from("data_pribadi").update(newData).eq("nik", nik).single();
	if (error) throw error;
	return data;
};

export default {
	getDataPribadi,
	createDataPribadi,
	updateDataPribadi,
};
