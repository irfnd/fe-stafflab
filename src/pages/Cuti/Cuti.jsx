import useCuti from "@/helpers/hooks/useCuti";
import useDokumen from "@/helpers/hooks/useDokumen";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import CutiList from "@/components/lists/CutiList";

export default function Cuti() {
	useCuti();
	useDokumen();

	return (
		<Flex direction='column' w='full' gap={8}>
			<CutiList />
		</Flex>
	);
}
