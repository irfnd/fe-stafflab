import Supabase from "@/helpers/Supabase";

export const createJabatan = async (newData) => {
	const { data, error } = await Supabase.from("jabatan").insert(newData).select();
	if (error) throw error;
	return data[0];
};

export const updateJabatan = async (newData, id) => {
	const { data, error } = await Supabase.from("jabatan").update(newData).eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export const deleteJabatan = async (id) => {
	const { data, error } = await Supabase.from("jabatan").delete().eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export default {
	createJabatan,
	updateJabatan,
	deleteJabatan,
};
