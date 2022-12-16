import { JabatanActions, JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import Supabase from "@/helpers/Supabase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useJabatan() {
	const jabatan = useSelector(JabatanSelector.selectAll);
	const dispatch = useDispatch();

	const fetchJabatan = async () => {
		const { data } = await Supabase.from("jabatan").select("*").order("createdAt");
		if (data) dispatch(JabatanActions.set(data));
	};

	const changeJabatan = (payload) => {
		const { createdAt, id, ...newJabatan } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(JabatanActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(JabatanActions.update({ id: payload.old.id, changes: newJabatan }));
				break;
			case "DELETE":
				dispatch(JabatanActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchJabatan();
		Supabase.channel("public:jabatan").on("postgres_changes", { event: "*", schema: "public", table: "jabatan" }, changeJabatan).subscribe();
	}, []);

	return { jabatan };
}
