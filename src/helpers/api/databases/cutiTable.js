import Supabase from "@/helpers/Supabase";

export const getCuti = async () => {
	const results = await Supabase.from("cuti").select("*, pegawai(nama)").order("createdAt", { ascending: false });
	return results;
};

export const updateCuti = async (newData, id) => {
	const { data, error } = await Supabase.from("cuti").update(newData).eq("id", id).single();
	if (error) throw error;
	return data;
};

export default {
	getCuti,
	updateCuti,
};
