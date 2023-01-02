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
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Award, Building2, CalendarClock, Cog, FileBadge, Network, Pocket, Tags } from "lucide-react";

// Components
import FilesList from "@/components/lists/FilesList";

export default function MutasiCard() {
	const bgCard = useColorModeValue("white", "gray.800");
	const bgSection = useColorModeValue("white", "gray.800");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	return (
		<Card bg={bgCard} display='flex' flexDir='column' p={10} gap={4}>
			<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
				<Text fontSize='2xl' fontWeight='semibold' noOfLines={1}>
					Nama pegawai
				</Text>
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={2}>
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={2}>
					<Flex direction='column' gap={2} mb={2}>
						<Flex align='center' gap={2}>
							<Icon as={Cog} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
								Mutasi
							</Text>
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={CalendarClock} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' color={fontFileColor}>
								Tanggal Mutasi
							</Text>
						</Flex>
					</Flex>
					<Flex direction='column' gap={2}>
						<Flex align='center' gap={2}>
							<Icon as={Tags} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
								Tipe Pegawai &rarr;
							</Text>
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={FileBadge} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' color={fontFileColor}>
								Status Pegawai &rarr;
							</Text>
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Building2} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' color={fontFileColor}>
								Instansi &rarr;
							</Text>
						</Flex>
					</Flex>
					<Flex direction='column' gap={2}>
						<Flex align='center' gap={2}>
							<Icon as={Network} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' color={fontFileColor}>
								Divisi &rarr;
							</Text>
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Award} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
								Jabatan &rarr;
							</Text>
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Pocket} fontSize='lg' color={iconFileColor} />
							<Text fontSize='sm' color={fontFileColor}>
								Golongan &rarr;
							</Text>
						</Flex>
					</Flex>
				</SimpleGrid>
			</CardBody>
			<CardFooter display='flex' flexDir='column' mt={4} p={0}>
				<Accordion display='flex' flexDirection='column' gap={8} allowToggle>
					<AccordionItem border='none' bg={bgSection} rounded='md'>
						<AccordionButton display='flex' justifyContent='space-between' w='full' p={0} _hover={{ bg: "inherit" }}>
							<Text align='left' fontSize='lg'>
								Dokumen Berkaitan
							</Text>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel display='flex' flexDirection='column' pt={6} pb={0} px={0} gap={6}>
							<FilesList category='jabatan' withTitle={false} withAddBtn={false} />
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</CardFooter>
		</Card>
	);
}
