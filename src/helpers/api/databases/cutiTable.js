import Supabase from "@/helpers/Supabase";

export const getCuti = async () => {
	const results = await Supabase.from("cuti").select("*, pegawai(*)").order("createdAt", { ascending: false });
	return results;
};

export const getCutiById = async (id) => {
	const results = await Supabase.from("cuti").select("*, pegawai(*)").eq("id", id).single();
	return results;
};

export const updateCuti = async (newData, id) => {
	const { data, error } = await Supabase.from("cuti").update(newData).eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export const deleteCuti = async (id) => {
	const { data, error } = await Supabase.from("cuti").delete().eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export default {
	getCuti,
	getCutiById,
	updateCuti,
	deleteCuti,
};
