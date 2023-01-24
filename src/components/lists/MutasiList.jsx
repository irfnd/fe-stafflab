import { MutasiSelector } from "@/helpers/redux/slices/MutasiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import MutasiCard from "@/components/cards/MutasiCard";

export default function MutasiList({ page }) {
	const mutasi = useSelector(MutasiSelector.selectAll);

	return (
		<SimpleGrid columns={1} spacing={6}>
			{mutasi && mutasi.map((data, i) => <MutasiCard key={i} mutasi={data} page={page} />)}
		</SimpleGrid>
	);
}
