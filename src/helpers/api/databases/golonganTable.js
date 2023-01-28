import Supabase from "@/helpers/Supabase";

export const getGolongan = async () => {
	const results = await Supabase.from("golongan").select("*");
	return results;
};

export const createGolongan = async (newData) => {
	const { data, error } = await Supabase.from("golongan").insert(newData).single();
	if (error) throw error;
	return data;
};

export const updateGolongan = async (newData, id) => {
	const { data, error } = await Supabase.from("golongan").update(newData).eq("id", id).single();
	if (error) throw error;
	return data;
};

export const deleteGolongan = async (id) => {
	const { data, error } = await Supabase.from("golongan").delete().eq("id", id).single();
	if (error) throw error;
	return data;
};

export default {
	getGolongan,
	createGolongan,
	updateGolongan,
	deleteGolongan,
};
