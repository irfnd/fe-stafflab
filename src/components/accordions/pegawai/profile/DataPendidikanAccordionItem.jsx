// Styles & Icons
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, useColorModeValue } from "@chakra-ui/react";

// Components
import PendidikanList from "@/components/lists/PendidikanList";

export default function DataPendidikanAccordionItem() {
	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<AccordionItem border='none' bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<AccordionButton display='flex' justifyContent='space-between' p={0} _hover={{ bg: "inherit" }}>
				<Heading align='left' fontSize={{ base: "xl", md: "2xl" }}>
					Riwayat Pendidikan Pegawai
				</Heading>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel display='flex' flexDirection='column' pt={6} pb={0} px={0} gap={6}>
				<PendidikanList />
			</AccordionPanel>
		</AccordionItem>
	);
}
