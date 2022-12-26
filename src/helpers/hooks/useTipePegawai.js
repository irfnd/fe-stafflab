import Supabase from "@/helpers/Supabase";
import { TipePegawaiActions, TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTipePegawai() {
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchTipePegawai = async () => {
		const { data } = await Supabase.from("tipe_pegawai").select("*");
		if (data) dispatch(TipePegawaiActions.set(data));
	};

	const changeTipePegawai = (payload) => {
		const { createdAt, id, ...newTipePegawai } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(TipePegawaiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(TipePegawaiActions.update({ id: payload.old.id, changes: newTipePegawai }));
				break;
			case "DELETE":
				dispatch(TipePegawaiActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchTipePegawai();
		Supabase.channel("public:tipe_pegawai")
			.on("postgres_changes", { event: "*", schema: "public", table: "tipe_pegawai" }, changeTipePegawai)
			.subscribe();
	}, []);

	return { tipePegawai };
}
