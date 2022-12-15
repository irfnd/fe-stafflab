import { InstansiActions, InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import Supabase from "@/helpers/Supabase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useInstansi() {
	const instansi = useSelector(InstansiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchInstansi = async () => {
		const { data } = await Supabase.from("instansi").select("*").order("createdAt");
		if (data) dispatch(InstansiActions.set(data));
	};

	const changeInstansi = (payload) => {
		const { createdAt, id, ...newInstansi } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(InstansiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(InstansiActions.update({ id: payload.old.id, changes: newInstansi }));
				break;
			case "DELETE":
				dispatch(InstansiActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchInstansi();
		Supabase.channel("public:instansi").on("postgres_changes", { event: "*", schema: "public", table: "instansi" }, changeInstansi).subscribe();
	}, []);

	return { instansi };
}
