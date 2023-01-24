// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import GenderPegawaiChart from "@/components/charts/GenderPegawaiChart";
import StatusPegawaiChart from "@/components/charts/StatusPegawaiChart";
import TotalPegawaiChart from "@/components/charts/TotalPegawaiChart";

export default function Home() {
	return (
		<Flex direction={{ base: "column", lg: "row" }} w='full' gap={8}>
			<TotalPegawaiChart />
			<Flex direction={{ base: "column", md: "row", lg: "column" }} w={{ base: "full", lg: "30%" }} gap={8}>
				<GenderPegawaiChart />
				<StatusPegawaiChart />
			</Flex>
		</Flex>
	);
}
