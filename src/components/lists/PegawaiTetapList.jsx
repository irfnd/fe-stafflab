import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import PegawaiCard from "@/components/cards/PegawaiCard";
import NoData from "@/components/others/NoData";

export default function PegawaiTetapList() {
	const pegawai = useSelector(PegawaiSelector.selectAll);
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const tetap = tipePegawai?.filter((el) => el.nama === "Tetap")[0];
	const pegawaiTetap = pegawai?.filter((el) => el.idTipe === tetap?.id);

	return pegawaiTetap?.length > 0 ? (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
			{pegawaiTetap.map((el) => (
				<PegawaiCard key={el.nip} pegawai={el} page='tetap' />
			))}
		</SimpleGrid>
	) : (
		<NoData page='Pegawai' />
	);
}
