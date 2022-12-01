// Styles & Icons
import { SimpleGrid, Flex, Text } from "@chakra-ui/react";

// Components
import PegawaiCard from "@/components/cards/PegawaiCard";

export default function PegawaiAktifList() {
	return (
		<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={8}>
			{[...Array(12)].map((_, i) => (
				<PegawaiCard key={i} />
			))}
		</SimpleGrid>
	);
}
