import Supabase from "@/helpers/Supabase";

export const getDivisi = async () => {
	const results = await Supabase.from("divisi").select("*");
	return results;
};

export const createDivisi = async (newData) => {
	const { data, error } = await Supabase.from("divisi").insert(newData).single();
	if (error) throw error;
	return data;
};

export const updateDivisi = async (newData, id) => {
	const { data, error } = await Supabase.from("divisi").update(newData).eq("id", id).single();
	if (error) throw error;
	return data;
};

export const deleteDivisi = async (id) => {
	const { data, error } = await Supabase.from("divisi").delete().eq("id", id).single();
	if (error) throw error;
	return data;
};

export default {
	getDivisi,
	createDivisi,
	updateDivisi,
	deleteDivisi,
};
