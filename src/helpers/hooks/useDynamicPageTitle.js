import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export default function useDynamicPageTitle() {
	const [dynamicTitle, setDynamicTitle] = useState();
	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const location = useLocation();
	const nameLocation = location.pathname.replaceAll("/", " ").trim().split(" ")[0];

	useEffect(() => {
		if (pegawai) setDynamicTitle(`${nameLocation.charAt(0).toUpperCase() + nameLocation.slice(1)} ${pegawai.nama}`);
	}, [pegawai, location]);

	return dynamicTitle || "Loading";
}
