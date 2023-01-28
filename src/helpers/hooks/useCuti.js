import Supabase from "@/helpers/Supabase";
import { getCuti } from "@/helpers/api/databases/cutiTable";
import { CutiActions, CutiSelector } from "@/helpers/redux/slices/CutiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCuti() {
	const cuti = useSelector(CutiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchCuti = async () => {
		const { data } = await getCuti();
		if (data) dispatch(CutiActions.set(data));
	};

	const changeCuti = (payload) => {
		const { createdAt, id, ...newCuti } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(CutiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(CutiActions.update({ id: payload.old.id, changes: newCuti }));
				break;
			case "DELETE":
				dispatch(CutiActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchCuti();
		Supabase.channel("public:cuti").on("postgres_changes", { event: "*", schema: "public", table: "cuti" }, changeCuti).subscribe();
	}, []);

	return { cuti };
}
