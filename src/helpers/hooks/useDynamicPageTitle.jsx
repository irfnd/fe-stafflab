import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function useDynamicPageTitle() {
	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	return pegawai?.nama;
}
