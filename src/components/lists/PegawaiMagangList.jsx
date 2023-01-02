import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import PegawaiCard from "@/components/cards/PegawaiCard";

export default function PegawaiMagangList() {
	const pegawai = useSelector(PegawaiSelector.selectAll);
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const magang = tipePegawai?.filter((el) => el.nama === "Magang")[0];
	const pegawaiMagang = pegawai?.filter((el) => el.idTipe === magang?.id);

	return (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
			{pegawaiMagang?.map((el) => (
				<PegawaiCard key={el.nip} pegawai={el} page='magang' />
			))}
		</SimpleGrid>
	);
}
