import Supabase from "@/helpers/Supabase";

export const uploadDocument = async (newData) => {
	const { folder, kategori, namaFile, file, pegawai } = newData;
	const filename = `${namaFile} - ${pegawai}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("dokumen").upload(`${folder}/${kategori}/${filename}`, file);
	if (error) throw error;
	return { ...data };
};

export default {
	uploadDocument,
};
