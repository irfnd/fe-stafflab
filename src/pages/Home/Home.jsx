// Styles & Icons
import { Text, Flex } from "@chakra-ui/react";

// Components
import GenderPegawaiChart from "@/components/charts/GenderPegawaiChart";

export default function Home() {
	return (
		<Flex w='full'>
			<GenderPegawaiChart />
		</Flex>
	);
}
