import Supabase from "@/helpers/Supabase";
import { DataPribadiActions, DataPribadiSelector } from "@/helpers/redux/slices/DataPribadiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let dataPribadiSubs = null;

export default function useDataPribadi(nip) {
	const dataPribadi = useSelector((state) => DataPribadiSelector.selectById(state, nip));
	const dispatch = useDispatch();

	const fetchDataPribadi = async () => {
		const { data } = await Supabase.from("data_pribadi").select("*").eq("nipPegawai", nip);
		if (data) dispatch(DataPribadiActions.set(data));
	};

	const changeDataPribadi = (payload) => {
		const { createdAt, nipPegawai, nik, ...newDataPribadi } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(DataPribadiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(DataPribadiActions.update({ id: payload.old.nipPegawai, changes: newDataPribadi }));
				break;
			case "DELETE":
				dispatch(DataPribadiActions.delete(payload.old.nipPegawai));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchDataPribadi();
		dataPribadiSubs = Supabase.channel("public:data_pribadi")
			.on("postgres_changes", { event: "*", schema: "public", table: "data_pribadi" }, changeDataPribadi)
			.subscribe();
		return () => {
			dispatch(DataPribadiActions.reset());
			Supabase.removeChannel(dataPribadiSubs);
		};
	}, []);

	return { dataPribadi };
}
