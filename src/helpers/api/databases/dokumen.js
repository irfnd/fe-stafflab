import Supabase from "@/helpers/Supabase";

export const createDokumen = async (newData) => {
	const { nama, detail, nipPegawai, kategori } = newData;
	const { data, error } = await Supabase.from("dokumen").insert({ nama, detail, nipPegawai, kategori }).select();

	if (error) throw error;
	return data[0];
};

export default {
	createDokumen,
};
