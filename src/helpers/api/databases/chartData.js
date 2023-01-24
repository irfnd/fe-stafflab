import Supabase from "@/helpers/Supabase";

export const getTotalPegawai = async () => {
	const { data: tipe } = await Supabase.from("tipe_pegawai").select("*");
	if (tipe) {
		const results = await Promise.all(
			tipe.map(async (el) => {
				const { count, error } = await Supabase.from("pegawai").select("*", { count: "exact" }).eq("idTipe", el?.id);
				if (!error) return count;
				return 0;
			})
		);
		return results;
	}
	return null;
};

export const getGender = async () => {
	const { count: pria, error: priaErr } = await Supabase.from("data_pribadi").select("*", { count: "exact" }).eq("jenisKelamin", "l");
	const { count: wanita, error: wanitaErr } = await Supabase.from("data_pribadi").select("*", { count: "exact" }).eq("jenisKelamin", "p");
	if (!priaErr && !wanitaErr) return [pria, wanita];
	return null;
};

export const getStatusPegawai = async () => {
	const { data: status } = await Supabase.from("status_pegawai").select("*");
	if (status) {
		const results = await Promise.all(
			status.map(async (el) => {
				const { count, error } = await Supabase.from("pegawai").select("*", { count: "exact" }).eq("idStatus", el?.id);
				if (!error) return count;
				return 0;
			})
		);
		return results;
	}
	return null;
};

export default {
	getTotalPegawai,
	getGender,
	getStatusPegawai,
};
