import Supabase from "@/helpers/Supabase";

export const getDokumen = async () => {
	const results = await Supabase.from("dokumen").select("*");
	return results;
};

export const getDokumenById = async (nip) => {
	const results = await Supabase.from("dokumen").select("*").eq("nipPegawai", nip);
	return results;
};

export const createDokumen = async (newData) => {
	const { nama, detail, nipPegawai, kategori } = newData;
	const { data, error } = await Supabase.from("dokumen").insert({ nama, detail, nipPegawai, kategori }).single();
	if (error) throw error;
	return data;
};

export const updateDokumen = async (newData, id) => {
	const { data, error } = await Supabase.from("dokumen").update(newData).eq("id", id).single();
	if (error) throw error;
	return data;
};

export const deleteDokumen = async (id) => {
	const { data, error } = await Supabase.from("dokumen").delete().eq("id", id).single();
	if (error) throw error;
	return data;
};

export default {
	getDokumen,
	getDokumenById,
	createDokumen,
	updateDokumen,
	deleteDokumen,
};
