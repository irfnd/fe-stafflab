import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import PegawaiCard from "@/components/cards/PegawaiCard";

export default function PegawaiOutsourcingList() {
	const pegawai = useSelector(PegawaiSelector.selectAll);
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const outsourcing = tipePegawai?.filter((el) => el.nama === "Outsourcing")[0];
	const pegawaiOutsourcing = pegawai?.filter((el) => el.idTipe === outsourcing?.id);

	return (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
			{pegawaiOutsourcing?.map((el) => (
				<PegawaiCard key={el.nip} pegawai={el} page='outsourcing' />
			))}
		</SimpleGrid>
	);
}
