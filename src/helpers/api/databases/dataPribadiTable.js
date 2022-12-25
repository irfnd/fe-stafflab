import Supabase from "@/helpers/Supabase";

export const createDataPribadi = async (newData) => {
	const { nik, tempatLahir, tanggalLahir, jenisKelamin, agama, kawin, alamat, nipPegawai } = newData;
	const { data, error } = await Supabase.from("data_pribadi")
		.insert({ nik, tempatLahir, tanggalLahir, jenisKelamin, agama, kawin, alamat, nipPegawai })
		.select();
	if (error) throw error;
	return data[0];
};

export const updateDataPribadi = async (newData, nik) => {
	const { data, error } = await Supabase.from("data_pribadi").update(newData).eq("nik", nik).select();
	if (error) throw error;
	return data[0];
};

export default {
	createDataPribadi,
	updateDataPribadi,
};
