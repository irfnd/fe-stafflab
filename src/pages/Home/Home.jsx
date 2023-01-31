// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import ChartPegawai from "@/components/cards/dashboard/ChartPegawai";
import NewPegawai from "@/components/cards/dashboard/NewPegawai";
import NewMutasi from "@/components/cards/dashboard/NewMutasi";
import NewCuti from "@/components/cards/dashboard/NewCuti";

export default function Home() {
	return (
		<Flex direction='column' gap={8}>
			<ChartPegawai />
			<NewPegawai />
			<NewMutasi />
			<NewCuti />
		</Flex>
	);
}
