import Supabase from "@/helpers/Supabase";
import { StatusPegawaiActions, StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useStatusPegawai() {
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchStatusPegawai = async () => {
		const { data } = await Supabase.from("status_pegawai").select("*");
		if (data) dispatch(StatusPegawaiActions.set(data));
	};

	const changeStatusPegawai = (payload) => {
		const { createdAt, id, ...newStatusPegawai } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(StatusPegawaiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(StatusPegawaiActions.update({ id: payload.old.id, changes: newStatusPegawai }));
				break;
			case "DELETE":
				dispatch(StatusPegawaiActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchStatusPegawai();
		Supabase.channel("public:status_pegawai")
			.on("postgres_changes", { event: "*", schema: "public", table: "status_pegawai" }, changeStatusPegawai)
			.subscribe();
	}, []);

	return { statusPegawai };
}
