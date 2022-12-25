import Supabase from "@/helpers/Supabase";

export const createDivisi = async (newData) => {
	const { data, error } = await Supabase.from("divisi").insert(newData).select();
	if (error) throw error;
	return data[0];
};

export const updateDivisi = async (newData, id) => {
	const { data, error } = await Supabase.from("divisi").update(newData).eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export const deleteDivisi = async (id) => {
	const { data, error } = await Supabase.from("divisi").delete().eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export default {
	createDivisi,
	updateDivisi,
	deleteDivisi,
};
