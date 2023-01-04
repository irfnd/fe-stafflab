import Supabase from "@/helpers/Supabase";

export const getMutasi = async () => {
	const results = await Supabase.from("mutasi").select("*");
	return results;
};

export const getMutasiById = async (nip) => {
	const results = await Supabase.from("mutasi").select("*").eq("nipPegawai", nip);
	return results;
};

export const createMutasi = async (newData) => {
	const { data, error } = await Supabase.from("mutasi").insert(newData).select();
	if (error) throw error;
	return data;
};

export default {
	getMutasi,
	getMutasiById,
	createMutasi,
};
