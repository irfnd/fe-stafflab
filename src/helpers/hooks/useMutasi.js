import Supabase from "@/helpers/Supabase";
import { getMutasi, getMutasiById } from "@/helpers/api/databases/mutasiTable";
import { MutasiActions, MutasiSelector } from "@/helpers/redux/slices/MutasiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let mutasiSubs = null;

export default function useMutasi(nip = null, diterima = true) {
	const mutasi = useSelector(MutasiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchMutasi = async () => {
		if (nip) {
			const { data } = await getMutasiById(nip);
			if (data) dispatch(MutasiActions.set(data));
		} else {
			const { data } = await getMutasi(diterima);
			if (data) dispatch(MutasiActions.set(data));
		}
	};

	const changeMutasi = (payload) => {
		const { createdAt, id, ...newMutasi } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(MutasiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(MutasiActions.update({ id: payload.old.id, changes: newMutasi }));
				break;
			case "DELETE":
				dispatch(MutasiActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchMutasi();
		mutasiSubs = Supabase.channel("public:mutasi")
			.on("postgres_changes", { event: "*", schema: "public", table: "mutasi" }, changeMutasi)
			.subscribe();
		return () => {
			dispatch(MutasiActions.reset());
			Supabase.removeChannel(mutasiSubs);
		};
	}, []);

	return { mutasi };
}
