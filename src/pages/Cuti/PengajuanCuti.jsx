import useCuti from "@/helpers/hooks/useCuti";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import PengajuanCutiTable from "@/components/tables/PengajuanCutiTable";

export default function Cuti() {
	useCuti();

	return (
		<Flex direction='column' w='full' gap={8}>
			<PengajuanCutiTable />
		</Flex>
	);
}
