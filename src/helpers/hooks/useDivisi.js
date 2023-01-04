import Supabase from "@/helpers/Supabase";
import { getDivisi } from "@/helpers/api/databases/divisiTable";
import { DivisiActions, DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useDivisi() {
	const divisi = useSelector(DivisiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchDivisi = async () => {
		const { data } = await getDivisi();
		if (data) dispatch(DivisiActions.set(data));
	};

	const changeDivisi = (payload) => {
		const { createdAt, id, ...newDivisi } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(DivisiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(DivisiActions.update({ id: payload.old.id, changes: newDivisi }));
				break;
			case "DELETE":
				dispatch(DivisiActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchDivisi();
		Supabase.channel("public:divisi").on("postgres_changes", { event: "*", schema: "public", table: "divisi" }, changeDivisi).subscribe();
	}, []);

	return { divisi };
}
