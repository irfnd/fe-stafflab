import Supabase from "@/helpers/Supabase";
import { DokumenActions, DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let dokumenSubs = null;

export default function useDokumen(nip) {
	const dokumen = useSelector(DokumenSelector.selectAll);
	const dispatch = useDispatch();

	const fetchDokumen = async () => {
		const { data } = await Supabase.from("dokumen").select("*").eq("nipPegawai", nip);
		if (data) dispatch(DokumenActions.set(data));
	};

	const changeDokumen = (payload) => {
		const { createdAt, id, ...newDokumen } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(DokumenActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(DokumenActions.update({ id: payload.old.id, changes: newDokumen }));
				break;
			case "DELETE":
				dispatch(DokumenActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchDokumen();
		dokumenSubs = Supabase.channel("public:dokumen")
			.on("postgres_changes", { event: "*", schema: "public", table: "dokumen" }, changeDokumen)
			.subscribe();
		return () => {
			dispatch(DokumenActions.reset());
			Supabase.removeChannel(dokumenSubs);
		};
	}, []);

	return { dokumen };
}
