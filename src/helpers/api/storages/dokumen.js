import Supabase from "@/helpers/Supabase";

export const uploadDocument = async (newData) => {
	const { folder, kategori, namaFile, file, pegawai } = newData;
	const filename = `${namaFile} - ${pegawai}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("dokumen").upload(`${folder}/${kategori}/${filename}`, file);
	if (error) throw error;
	return { ...data };
};

export const replaceDokumen = async (path, file) => {
	const filename = `${path.split(".").slice(0, -1).join(".")}.${file.name.match(/[^.]+$/)}`;
	const { data, error } = await Supabase.storage.from("dokumen").update(filename, file);
	if (error) throw error;
	return data;
};

export const renameDokumen = async (path, newName) => {
	const toPath = `${path.substring(0, path.lastIndexOf("/"))}/${newName}.${path.match(/[^.]+$/)}`;
	const { error } = await Supabase.storage.from("dokumen").move(path, toPath);
	if (error) throw error;
	return { path: toPath };
};

export const deleteDokumen = async (path) => {
	const { data, error } = await Supabase.storage.from("dokumen").remove([path]);
	if (error) throw error;
	return data;
};

export default {
	uploadDocument,
	replaceDokumen,
	renameDokumen,
	deleteDokumen,
};
