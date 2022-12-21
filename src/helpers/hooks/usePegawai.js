import { PegawaiActions, PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import Supabase from "@/helpers/Supabase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePagination from "@/helpers/hooks/usePagination";

let pegawaiSubscription = null;

export default function usePegawai(query) {
	const { status, search, filter, order, sort, page, limit } = query;
	const { from, to } = usePagination(page, limit);
	const [totalPages, setTotalPages] = useState(null);
	const pegawai = useSelector(PegawaiSelector.selectAll);
	const dispatch = useDispatch();

	const fetchPegawai = async () => {
		let results;
		if (search) {
			if (filter === "nama") {
				results = await Supabase.from("pegawai")
					.select("*", { count: "exact" })
					.ilike(filter, `%${search}%`)
					.eq("idStatus", status)
					.order(order, { ascending: sort === "asc" })
					.range(from, to);
			} else {
				results = await Supabase.from("pegawai")
					.select("*", { count: "exact" })
					.eq(filter, parseInt(search, 10))
					.eq("idStatus", status)
					.order(order, { ascending: sort === "asc" })
					.range(from, to);
			}
		} else {
			results = await Supabase.from("pegawai")
				.select("*", { count: "exact" })
				.eq("idStatus", status)
				.order(order, { ascending: sort === "asc" })
				.range(from, to);
		}
		if (results.data) {
			setTotalPages(Math.ceil(results.count / limit));
			dispatch(PegawaiActions.set(results.data));
		}
	};
	const changePegawai = (payload) => {
		const { createdAt, nip, ...newPegawai } = payload.new;
		switch (payload.eventType) {
			case "INSERT":
				dispatch(PegawaiActions.add(payload.new));
				break;
			case "UPDATE":
				dispatch(PegawaiActions.update({ id: payload.old.nip, changes: newPegawai }));
				break;
			case "DELETE":
				dispatch(PegawaiActions.delete(payload.old.nip));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		fetchPegawai();
		pegawaiSubscription = Supabase.channel("public:pegawai")
			.on("postgres_changes", { event: "*", schema: "public", table: "pegawai" }, changePegawai)
			.subscribe();
	}, [status, search, filter, order, sort, page, limit]);

	useEffect(() => {
		return () => {
			dispatch(PegawaiActions.reset());
			Supabase.removeChannel(pegawaiSubscription);
		};
	}, []);

	return { pegawai, totalPages };
}
