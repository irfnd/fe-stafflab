import Supabase from "@/helpers/Supabase";

export const getDokumen = async (nip) => {
	const results = await Supabase.from("dokumen").select("*").eq("nipPegawai", nip);
	return results;
};

export const createDokumen = async (newData) => {
	const { nama, detail, nipPegawai, kategori } = newData;
	const { data, error } = await Supabase.from("dokumen").insert({ nama, detail, nipPegawai, kategori }).select();
	if (error) throw error;
	return data[0];
};

export const updateDokumen = async (newData, id) => {
	const { data, error } = await Supabase.from("dokumen").update(newData).eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export const deleteDokumen = async (id) => {
	const { data, error } = await Supabase.from("dokumen").delete().eq("id", id).select();
	if (error) throw error;
	return data[0];
};

export default {
	getDokumen,
	createDokumen,
	updateDokumen,
	deleteDokumen,
};
