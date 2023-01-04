// Styles & Icons
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, useColorModeValue } from "@chakra-ui/react";

// Components
import MutasiList from "@/components/lists/MutasiList";

export default function RiwayatMutasiAccordionItem() {
	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<AccordionItem border='none' bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<AccordionButton display='flex' justifyContent='space-between' p={0} _hover={{ bg: "inherit" }}>
				<Heading align='left' fontSize={{ base: "xl", md: "2xl" }}>
					Riwayat Mutasi Pegawai
				</Heading>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel display='flex' flexDirection='column' pt={6} pb={0} px={0} gap={6}>
				<MutasiList page='profil' />
			</AccordionPanel>
		</AccordionItem>
	);
}
