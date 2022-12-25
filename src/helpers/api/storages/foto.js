import Supabase from "@/helpers/Supabase";

export const uploadPhoto = async (newData) => {
	const { folder, kategori, namaFile, file, pegawai } = newData;
	const filename = `${namaFile} - ${pegawai}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("foto").upload(`${folder}/${kategori}/${filename}`, file);
	if (error) throw error;
	return data;
};

export const getUrlPhoto = (path) => {
	const { data: getPublicUrl } = Supabase.storage.from("foto").getPublicUrl(path);
	return getPublicUrl;
};

export const replacePhoto = async (path, file) => {
	const filename = `${path.split(".").slice(0, -1).join(".")}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("foto").update(filename, file);
	if (error) throw error;
	return data;
};

export const deletePhoto = async (path) => {
	const { data, error } = await Supabase.storage.from("foto").remove([path]);
	if (error) throw error;
	return data;
};

export default {
	uploadPhoto,
	getUrlPhoto,
	replacePhoto,
	deletePhoto,
};
