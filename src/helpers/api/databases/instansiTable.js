import Supabase from "@/helpers/Supabase";

export const createInstansi = async (newData) => {
	const { data, error } = await Supabase.from("instansi").insert(newData).select();
	if (error) throw error;
	return data[0];
};

export const updateInstansi = async (newData, id) => {
	const { data, error } = await Supabase.from("instansi").update(newData).eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export const deleteInstansi = async (id) => {
	const { data, error } = await Supabase.from("instansi").delete().eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export default {
	createInstansi,
	updateInstansi,
	deleteInstansi,
};
