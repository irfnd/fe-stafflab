// Styles & Icons
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading, useColorModeValue, Flex } from "@chakra-ui/react";

// Components
import DataDiriSection from "@/components/forms/pegawai/profile/DataDiriSection";

export default function DataDiriAccordionItem() {
	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<AccordionItem border='none' bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<AccordionButton display='flex' justifyContent='space-between' p={0} _hover={{ bg: "inherit" }}>
				<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
					Data Diri Pegawai
				</Heading>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel display='flex' flexDirection='column' pt={6} pb={0} px={0} gap={6}>
				<DataDiriSection />
				<Flex>
					<Heading textAlign={{ base: "center", md: "left" }} fontSize='xl'>
						Dokumen Berkaitan
					</Heading>
				</Flex>
			</AccordionPanel>
		</AccordionItem>
	);
}
