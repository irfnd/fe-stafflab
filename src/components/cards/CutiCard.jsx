import useDate from "@/helpers/hooks/useDate";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Icon,
	Skeleton,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { CalendarRange, FileText } from "lucide-react";

// Components
import FilesCutiList from "@/components/lists/FilesCutiList";

export default function CutiCard({ cuti }) {
	const dokumen = useSelector(DokumenSelector.selectAll);

	const bgCard = useColorModeValue("white", "gray.800");
	const borderCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	return (
		<Card bg={bgCard} display='flex' flexDir='column' p={10} gap={6} border='none' borderColor={borderCard} shadow='md'>
			<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
				<Text fontSize='xl' casing='capitalize' fontWeight='semibold' noOfLines={1}>
					{cuti?.pegawai?.nama}
				</Text>
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={{ base: 6, md: 4 }}>
				<Flex direction='column' w={{ base: "full", md: "40%", xl: "50%" }} gap={2}>
					<Flex align='center' gap={2}>
						<Icon as={CalendarRange} fontSize={20} color='cyan.500' />
						<Text>{cuti && `${useDate(cuti?.mulaiCuti, false)} - ${useDate(cuti?.selesaiCuti, false)}`}</Text>
					</Flex>
					<Flex align='center' gap={2}>
						<Icon as={FileText} fontSize={20} color='cyan.500' />
						<Text>{cuti?.keterangan}</Text>
					</Flex>
				</Flex>
			</CardBody>
			<CardFooter p={0}>
				<Accordion display='flex' flexDirection='column' w='full' gap={8} allowToggle>
					<AccordionItem border='none'>
						<AccordionButton display='flex' justifyContent='space-between' p={0} _hover={{ bg: "inherit" }}>
							<Text fontSize={{ base: "lg", md: "xl" }} fontWeight='semibold'>
								Dokumen Cuti
							</Text>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel display='flex' flexDirection='column' pt={4} pb={0} px={0} gap={6}>
							<FilesCutiList cuti={cuti} dokumen={dokumen} />
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</CardFooter>
		</Card>
	);
}
