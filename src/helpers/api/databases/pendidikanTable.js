import Supabase from "@/helpers/Supabase";

export const getPendidikan = async (nip) => {
	const results = await Supabase.from("pendidikan").select("*").eq("nipPegawai", nip);
	return results;
};

export const createPendidikan = async (newData) => {
	const { data, error } = await Supabase.from("pendidikan").insert(newData).single();
	if (error) throw error;
	return data;
};

export const updatePendidikan = async (newData, id) => {
	const { data, error } = await Supabase.from("pendidikan").update(newData).eq("id", id).single();
	if (error) throw error;
	return data;
};

export const deletePendidikan = async (id) => {
	const { data, error } = await Supabase.from("pendidikan").delete().eq("id", id).single();
	if (error) throw error;
	return data;
};

export default {
	createPendidikan,
	updatePendidikan,
	deletePendidikan,
};
