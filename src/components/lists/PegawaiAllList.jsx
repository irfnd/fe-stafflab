import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import PegawaiCard from "@/components/cards/PegawaiCard";
import NoData from "@/components/others/NoData";

export default function PegawaiAllList() {
	const pegawai = useSelector(PegawaiSelector.selectAll);

	return pegawai?.length > 0 ? (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
			{pegawai.map((el) => (
				<PegawaiCard key={el.nip} pegawai={el} page='mutasi' />
			))}
		</SimpleGrid>
	) : (
		<NoData page='Pegawai' />
	);
}
