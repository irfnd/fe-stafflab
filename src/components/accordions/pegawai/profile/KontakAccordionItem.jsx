// Styles & Icons
import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Heading,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

// Components
import KontakSection from "@/components/forms/pegawai/profile/KontakSection";
import AkunModal from "@/components/modals/akun/AkunModal";

export default function KontakAccordionItem() {
	const disclosure = useDisclosure();

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<AccordionItem border='none' bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<AccordionButton display='flex' justifyContent='space-between' p={0} _hover={{ bg: "inherit" }}>
				<Heading fontSize={{ base: "xl", md: "2xl" }}>Kontak dan Akun Pegawai</Heading>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel display='flex' flexDirection='column' pt={6} pb={0} px={0} gap={6}>
				<KontakSection />
				<Button w={{ base: "full", md: "fit-content" }} variant='outline' colorScheme='cyan' onClick={disclosure.onOpen}>
					Reset Password
				</Button>
				<AkunModal disclosure={disclosure} />
			</AccordionPanel>
		</AccordionItem>
	);
}
