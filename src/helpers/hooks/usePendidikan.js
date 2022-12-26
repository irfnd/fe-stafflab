import Supabase from "@/helpers/Supabase";
import { PendidikanActions, PendidikanSelector } from "@/helpers/redux/slices/PendidikanSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let pendidikanSubs = null;

export default function usePendidikan(nip) {
	const pendidikan = useSelector((state) => PendidikanSelector.selectById(state, nip));
	const dispatch = useDispatch();

	const fetchPendidikan = async () => {
		const { data } = await Supabase.from("pendidikan").select("*").eq("nipPegawai", nip);
		if (data) dispatch(PendidikanActions.set(data));
	};

	const changePendidikan = (payload) => {
		const { createdAt, id, ...newPendidikan } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(PendidikanActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(PendidikanActions.update({ id: payload.old.id, changes: newPendidikan }));
				break;
			case "DELETE":
				dispatch(PendidikanActions.delete(payload.old.id));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchPendidikan();
		pendidikanSubs = Supabase.channel("public:pendidikan")
			.on("postgres_changes", { event: "*", schema: "public", table: "pendidikan" }, changePendidikan)
			.subscribe();
		return () => {
			dispatch(PendidikanActions.reset());
			Supabase.removeChannel(pendidikanSubs);
		};
	}, []);

	return { pendidikan };
}
