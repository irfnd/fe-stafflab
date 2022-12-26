import Supabase from "@/helpers/Supabase";
import { PegawaiActions, PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let pegawaiSubs = null;

export default function usePegawaiById(nipPegawai) {
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, nipPegawai));
	const dispatch = useDispatch();

	const fetchPegawai = async () => {
		const { data } = await Supabase.from("pegawai").select("*").eq("nip", nipPegawai);
		if (data) dispatch(PegawaiActions.set(data));
	};

	const changePegawai = (payload) => {
		const { createdAt, nip, ...newPegawai } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(PegawaiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(PegawaiActions.update({ id: payload.old.nip, changes: newPegawai }));
				break;
			case "DELETE":
				dispatch(PegawaiActions.delete(payload.old.nip));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchPegawai();
		pegawaiSubs = Supabase.channel("public:pegawai")
			.on("postgres_changes", { event: "*", schema: "public", table: "pegawai" }, changePegawai)
			.subscribe();
		return () => {
			dispatch(PegawaiActions.reset());
			Supabase.removeChannel(pegawaiSubs);
		};
	}, []);

	return { pegawai };
}
