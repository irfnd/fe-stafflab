import Supabase from "@/helpers/Supabase";

export const uploadPhoto = async (newData) => {
	const { folder, kategori, namaFile, file, pegawai } = newData;
	const filePath = `${folder}/${kategori}/${namaFile} - ${pegawai}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("foto").upload(`${filePath}`, file, { upsert: true });
	if (error) throw error;
	return data;
};

export const getUrlPhoto = (path) => {
	const { data: getPublicUrl } = Supabase.storage.from("foto").getPublicUrl(path);
	return getPublicUrl;
};

export const deletePhoto = async (path) => {
	const { data, error } = await Supabase.storage.from("foto").remove([path]);
	if (error) throw error;
	return data;
};

export default {
	uploadPhoto,
	getUrlPhoto,
	deletePhoto,
};
