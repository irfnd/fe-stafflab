import Supabase from "@/helpers/Supabase";
import { getCuti, getCutiById, getCutiByNip } from "@/helpers/api/databases/cutiTable";
import { CutiActions, CutiSelector } from "@/helpers/redux/slices/CutiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let cutiSubs = null;

export default function useCuti(nip = null) {
	const cuti = useSelector(CutiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchCuti = async () => {
		if (nip) {
			const { data } = await getCutiByNip(nip);
			if (data) dispatch(CutiActions.set(data));
		} else {
			const { data } = await getCuti();
			if (data) dispatch(CutiActions.set(data));
		}
	};

	const insertCuti = async (payload) => {
		const { data } = await getCutiById(payload.new.id);
		dispatch(CutiActions.add(data));
	};

	const updateCuti = async (payload) => {
		const { data } = await getCutiById(payload.old.id);
		const { createdAt, id, ...newCuti } = data;
		dispatch(CutiActions.update({ id: payload.old.id, changes: newCuti }));
	};

	const deleteCuti = (payload) => dispatch(CutiActions.delete(payload.old.id));

	useEffect(() => {
		fetchCuti();
		cutiSubs = Supabase.channel("public:cuti")
			.on("postgres_changes", { event: "INSERT", schema: "public", table: "cuti" }, insertCuti)
			.on("postgres_changes", { event: "UPDATE", schema: "public", table: "cuti" }, updateCuti)
			.on("postgres_changes", { event: "DELETE", schema: "public", table: "cuti" }, deleteCuti)
			.subscribe();
		return () => {
			dispatch(CutiActions.reset());
			Supabase.removeChannel(cutiSubs);
		};
	}, []);

	return { cuti };
}
