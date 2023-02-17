import { useState, useEffect } from "react";
import Supabase from "@/helpers/Supabase";

export default function useManajer(uid) {
	const [pegawai, setPegawai] = useState(null);

	const getPegawai = async () => {
		const { data, error } = await Supabase.from("pegawai").select("*").eq("uuidUser", uid).single();
		if (!error) setPegawai(data || null);
	};

	useEffect(() => {
		getPegawai();
	}, []);

	return pegawai;
}
