// Styles & Icons
import { Flex, Heading } from "@chakra-ui/react";

// Components
import GenderPegawaiChart from "@/components/charts/GenderPegawaiChart";
import StatusPegawaiChart from "@/components/charts/StatusPegawaiChart";
import TotalPegawaiChart from "@/components/charts/TotalPegawaiChart";

export default function ChartPegawai() {
	return (
		<Flex direction='column' gap={6}>
			<Heading fontSize={{ base: "xl", md: "2xl" }}>Grafik Pegawai</Heading>
			<Flex direction={{ base: "column", lg: "row" }} w='full' gap={8}>
				<TotalPegawaiChart />
				<Flex direction={{ base: "column", md: "row", lg: "column" }} w={{ base: "full", lg: "30%" }} gap={8}>
					<GenderPegawaiChart />
					<StatusPegawaiChart />
				</Flex>
			</Flex>
		</Flex>
	);
}
