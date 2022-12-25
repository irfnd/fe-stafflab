import Supabase from "@/helpers/Supabase";

export const uploadPhoto = async (newData) => {
	const { folder, kategori, namaFile, file, pegawai } = newData;

	const filename = `${namaFile} - ${pegawai}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("foto").upload(`${folder}/${kategori}/${filename}`, file);
	if (error) throw error;
	return data;
};

export const getUrlPhoto = (path) => {
	const { data: getPublicUrl, error: getPublicUrlError } = Supabase.storage.from("foto").getPublicUrl(path);
	if (getPublicUrlError) throw getPublicUrlError;
	return getPublicUrl;
};

export default {
	uploadPhoto,
	getUrlPhoto,
};
