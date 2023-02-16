import Supabase from "@/helpers/Supabase";

export const getMutasi = async (diterima) => {
	const results = await Supabase.from("mutasi").select("*").eq("diterima", diterima);
	return results;
};

export const getMutasiById = async (nip) => {
	const results = await Supabase.from("mutasi").select("*").eq("nipPegawai", nip).eq("diterima", true);
	return results;
};

export const getNewMutasi = async () => {
	const { data, error } = await Supabase.from("mutasi").select("*, pegawai (*)").order("createdAt", { ascending: false }).range(0, 4);
	if (!error) return data;
	return null;
};

export const createMutasi = async (newData) => {
	const { data, error } = await Supabase.from("mutasi").insert(newData).select();
	if (error) throw error;
	return data[0];
};

export const updateMutasi = async (newData, id) => {
	const { data, error } = await Supabase.from("mutasi").update(newData).eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export const deleteMutasi = async (id) => {
	const { data, error } = await Supabase.from("mutasi").delete().eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export default {
	getMutasi,
	getMutasiById,
	getNewMutasi,
	createMutasi,
	updateMutasi,
	deleteMutasi,
};
