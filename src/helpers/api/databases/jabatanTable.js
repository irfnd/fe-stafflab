import Supabase from "@/helpers/Supabase";

export const getJabatan = async () => {
	const results = await Supabase.from("jabatan").select("*");
	return results;
};

export const createJabatan = async (newData) => {
	const { data, error } = await Supabase.from("jabatan").insert(newData).single();
	if (error) throw error;
	return data;
};

export const updateJabatan = async (newData, id) => {
	const { data, error } = await Supabase.from("jabatan").update(newData).eq("id", id).single();
	if (error) throw error;
	return data;
};

export const deleteJabatan = async (id) => {
	const { data, error } = await Supabase.from("jabatan").delete().eq("id", id).single();
	if (error) throw error;
	return data;
};

export default {
	getJabatan,
	createJabatan,
	updateJabatan,
	deleteJabatan,
};
