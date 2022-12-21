import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useSelector } from "react-redux";

export default function DynamicBreadcrumbs({ match }) {
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, match.params.id));
	return pegawai?.nama;
}
