import { GolonganActions, GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import Supabase from "@/helpers/Supabase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGolongan() {
	const golongan = useSelector(GolonganSelector.selectAll);
	const dispatch = useDispatch();

	const fetchGolongan = async () => {
		const { data } = await Supabase.from("golongan").select("*");
		if (data) dispatch(GolonganActions.set(data));
	};

	const changeGolongan = (payload) => {
		const { createdAt, id, ...newGolongan } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(GolonganActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(GolonganActions.update({ id: payload.old.id, changes: newGolongan }));
				break;
			case "DELETE":
				dispatch(GolonganActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchGolongan();
		Supabase.channel("public:golongan").on("postgres_changes", { event: "*", schema: "public", table: "golongan" }, changeGolongan).subscribe();
	}, []);

	return { golongan };
}
