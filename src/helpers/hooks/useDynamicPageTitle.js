import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function useDynamicPageTitle() {
	const [dynamicTitle, setDynamicTitle] = useState();
	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));

	useEffect(() => {
		if (pegawai) setDynamicTitle(pegawai?.nama);
	}, [pegawai]);

	return dynamicTitle || "Loading";
}
