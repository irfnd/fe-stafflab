// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import MutasiCard from "@/components/cards/MutasiCard";

export default function MutasiList() {
	return (
		<SimpleGrid columns={1} spacing={6}>
			{[...Array(2)].map((el, i) => (
				<MutasiCard key={i} />
			))}
		</SimpleGrid>
	);
}
