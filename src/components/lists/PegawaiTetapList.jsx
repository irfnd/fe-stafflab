import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import PegawaiCard from "@/components/cards/PegawaiCard";

export default function PegawaiTetapList() {
	const pegawai = useSelector(PegawaiSelector.selectAll);

	return (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
			{pegawai?.map((el) => (
				<PegawaiCard key={el.nip} pegawai={el} />
			))}
		</SimpleGrid>
	);
}
