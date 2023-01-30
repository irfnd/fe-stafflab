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

export default function CutiCard({ cuti, page = "cuti" }) {
	const dokumen = useSelector(DokumenSelector.selectAll);

	const bgCard = useColorModeValue("white", "gray.800");
	const borderCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	return (
		<Card
			bg={bgCard}
			display='flex'
			flexDir='column'
			p={page === "cuti" ? 10 : 4}
			gap={6}
			border={page === "cuti" ? "none" : "1px solid"}
			borderColor={borderCard}
			shadow={page === "cuti" ? "md" : "none"}
		>
			{page === "cuti" ? (
				<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
					<Skeleton w='full' rounded='md' isLoaded={cuti && dokumen}>
						<Text fontSize='2xl' fontWeight='semibold' noOfLines={1}>
							{cuti?.pegawai?.nama} ({cuti?.pegawai?.nip})
						</Text>
					</Skeleton>
				</CardHeader>
			) : (
				<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
					<Skeleton w='full' rounded='md' isLoaded={cuti && dokumen}>
						<Text fontSize='xl' fontWeight='semibold' noOfLines={1}>
							{cuti?.keterangan}
						</Text>
					</Skeleton>
				</CardHeader>
			)}
			<CardBody display='flex' flexDir='column' p={0} gap={{ base: 6, md: 4 }}>
				<Skeleton w='full' rounded='md' isLoaded={cuti && dokumen}>
					<Text fontSize={page === "cuti" ? { base: "lg", md: "xl" } : "md"} fontWeight='semibold' noOfLines={1}>
						Keterangan Cuti
					</Text>
				</Skeleton>
				<Flex direction='column' w={{ base: "full", md: "40%", xl: "50%" }} gap={2}>
					<Skeleton w='full' rounded='md' isLoaded={cuti && dokumen}>
						<Flex align='center' gap={2}>
							<Icon as={CalendarRange} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
								{cuti && `${useDate(cuti?.mulaiCuti, false)} - ${useDate(cuti?.selesaiCuti, false)}`}
							</Text>
						</Flex>
					</Skeleton>
					<Skeleton w='full' rounded='md' isLoaded={cuti && dokumen}>
						<Flex align='center' gap={2}>
							<Icon as={FileText} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
								{cuti?.keterangan}
							</Text>
						</Flex>
					</Skeleton>
				</Flex>
			</CardBody>
			<CardFooter p={0}>
				<Accordion display='flex' flexDirection='column' w='full' gap={8} allowToggle>
					<Skeleton w='full' rounded='md' isLoaded={cuti && dokumen}>
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
					</Skeleton>
				</Accordion>
			</CardFooter>
		</Card>
	);
}
