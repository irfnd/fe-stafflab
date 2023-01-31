import { getPegawaiById } from "@/helpers/api/databases/pegawaiTable";
import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDate from "@/helpers/hooks/useDate";

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
import { Award, Building2, CalendarClock, Cog, FileBadge, Network, Pocket, Tags } from "lucide-react";

// Components
import FilesMutasiList from "@/components/lists/FilesMutasiList";

export default function MutasiCard({ mutasi, page = "mutasi" }) {
	const [pegawai, setPegawai] = useState(null);
	const dokumen = useSelector(DokumenSelector.selectAll);
	const fromTipe = useSelector((state) => TipePegawaiSelector.selectById(state, mutasi?.detail?.tipe?.from));
	const toTipe = useSelector((state) => TipePegawaiSelector.selectById(state, mutasi?.detail?.tipe?.to));
	const fromStatus = useSelector((state) => StatusPegawaiSelector.selectById(state, mutasi?.detail?.status?.from));
	const toStatus = useSelector((state) => StatusPegawaiSelector.selectById(state, mutasi?.detail?.status?.to));
	const fromInstansi = useSelector((state) => InstansiSelector.selectById(state, mutasi?.detail?.instansi?.from));
	const toInstansi = useSelector((state) => InstansiSelector.selectById(state, mutasi?.detail?.instansi?.to));
	const fromDivisi = useSelector((state) => DivisiSelector.selectById(state, mutasi?.detail?.divisi?.from));
	const toDivisi = useSelector((state) => DivisiSelector.selectById(state, mutasi?.detail?.divisi?.to));
	const fromJabatan = useSelector((state) => JabatanSelector.selectById(state, mutasi?.detail?.jabatan?.from));
	const toJabatan = useSelector((state) => JabatanSelector.selectById(state, mutasi?.detail?.jabatan?.to));
	const fromGolongan = useSelector((state) => GolonganSelector.selectById(state, mutasi?.detail?.golongan?.from));
	const toGolongan = useSelector((state) => GolonganSelector.selectById(state, mutasi?.detail?.golongan?.to));

	const bgCard = useColorModeValue("white", "gray.800");
	const borderCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	const getPegawai = async () => {
		const { data } = await getPegawaiById(mutasi?.nipPegawai);
		if (data) setPegawai(data[0]);
	};

	useEffect(() => {
		getPegawai();
	}, [mutasi]);

	return (
		<Card
			bg={bgCard}
			display='flex'
			flexDir='column'
			p={page === "mutasi" ? 10 : 4}
			gap={6}
			border={page === "mutasi" ? "none" : "1px solid"}
			borderColor={borderCard}
			shadow={page === "mutasi" ? "md" : "none"}
		>
			{page === "mutasi" ? (
				<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
					<Skeleton
						w='full'
						rounded='md'
						isLoaded={
							mutasi &&
							pegawai &&
							dokumen &&
							fromTipe &&
							toTipe &&
							fromStatus &&
							toStatus &&
							fromInstansi &&
							toInstansi &&
							fromDivisi &&
							toDivisi &&
							fromJabatan &&
							toJabatan &&
							fromGolongan &&
							toGolongan
						}
					>
						<Text fontSize='2xl' fontWeight='semibold' noOfLines={1}>
							{pegawai?.nama} ({pegawai?.nip})
						</Text>
					</Skeleton>
				</CardHeader>
			) : (
				<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
					<Skeleton
						w='full'
						rounded='md'
						isLoaded={
							mutasi &&
							pegawai &&
							dokumen &&
							fromTipe &&
							toTipe &&
							fromStatus &&
							toStatus &&
							fromInstansi &&
							toInstansi &&
							fromDivisi &&
							toDivisi &&
							fromJabatan &&
							toJabatan &&
							fromGolongan &&
							toGolongan
						}
					>
						<Text fontSize='xl' casing='capitalize' fontWeight='semibold' noOfLines={1}>
							Mutasi {mutasi?.jenisMutasi}
						</Text>
					</Skeleton>
				</CardHeader>
			)}
			<CardBody display='flex' flexDir={{ base: "column", md: "row" }} p={0} gap={{ base: 6, md: 4 }}>
				<Flex direction='column' w={{ base: "full", md: "40%", xl: "50%" }} gap={2}>
					<Skeleton
						w='full'
						rounded='md'
						isLoaded={
							mutasi &&
							pegawai &&
							dokumen &&
							fromTipe &&
							toTipe &&
							fromStatus &&
							toStatus &&
							fromInstansi &&
							toInstansi &&
							fromDivisi &&
							toDivisi &&
							fromJabatan &&
							toJabatan &&
							fromGolongan &&
							toGolongan
						}
					>
						<Text fontSize={page === "mutasi" ? { base: "lg", md: "xl" } : "md"} fontWeight='semibold' noOfLines={1}>
							Keterangan Mutasi
						</Text>
					</Skeleton>
					<Flex direction='column' gap={2}>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={Cog} fontSize='lg' color={iconFileColor} />
								<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
									Mutasi {mutasi?.jenisMutasi}
								</Text>
							</Flex>
						</Skeleton>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={CalendarClock} fontSize='lg' color={iconFileColor} />
								<Text fontSize='sm' color={fontFileColor}>
									{mutasi && useDate(mutasi?.tanggalMutasi, false)}
								</Text>
							</Flex>
						</Skeleton>
					</Flex>
				</Flex>
				<Flex direction='column' w={{ base: "full", md: "60%", xl: "50%" }} gap={2}>
					<Skeleton
						w='full'
						rounded='md'
						isLoaded={
							mutasi &&
							pegawai &&
							dokumen &&
							fromTipe &&
							toTipe &&
							fromStatus &&
							toStatus &&
							fromInstansi &&
							toInstansi &&
							fromDivisi &&
							toDivisi &&
							fromJabatan &&
							toJabatan &&
							fromGolongan &&
							toGolongan
						}
					>
						<Text fontSize={page === "mutasi" ? { base: "lg", md: "xl" } : "md"} fontWeight='semibold' noOfLines={1}>
							Detail Mutasi
						</Text>
					</Skeleton>
					<Flex direction='column' gap={2}>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={Tags} fontSize='lg' color={iconFileColor} />
								{fromTipe && toTipe && <DynamicDetailMutasi from={fromTipe} to={toTipe} />}
							</Flex>
						</Skeleton>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={FileBadge} fontSize='lg' color={iconFileColor} />
								{fromStatus && toStatus && <DynamicDetailMutasi from={fromStatus} to={toStatus} />}
							</Flex>
						</Skeleton>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={Building2} fontSize='lg' color={iconFileColor} />
								{fromInstansi && toInstansi && <DynamicDetailMutasi from={fromInstansi} to={toInstansi} />}
							</Flex>
						</Skeleton>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={Network} fontSize='lg' color={iconFileColor} />
								{fromDivisi && toDivisi && <DynamicDetailMutasi from={fromDivisi} to={toDivisi} />}
							</Flex>
						</Skeleton>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={Award} fontSize='lg' color={iconFileColor} />
								{fromJabatan && toJabatan && <DynamicDetailMutasi from={fromJabatan} to={toJabatan} />}
							</Flex>
						</Skeleton>
						<Skeleton
							w='full'
							rounded='md'
							isLoaded={
								mutasi &&
								pegawai &&
								dokumen &&
								fromTipe &&
								toTipe &&
								fromStatus &&
								toStatus &&
								fromInstansi &&
								toInstansi &&
								fromDivisi &&
								toDivisi &&
								fromJabatan &&
								toJabatan &&
								fromGolongan &&
								toGolongan
							}
						>
							<Flex align='center' gap={2}>
								<Icon as={Pocket} fontSize='lg' color={iconFileColor} />
								{fromGolongan && toGolongan && <DynamicDetailMutasi from={fromGolongan} to={toGolongan} />}
							</Flex>
						</Skeleton>
					</Flex>
				</Flex>
			</CardBody>
			<CardFooter p={0}>
				<Accordion display='flex' flexDirection='column' w='full' gap={8} allowToggle>
					<Skeleton
						w='full'
						rounded='md'
						isLoaded={
							mutasi &&
							pegawai &&
							dokumen &&
							fromTipe &&
							toTipe &&
							fromStatus &&
							toStatus &&
							fromInstansi &&
							toInstansi &&
							fromDivisi &&
							toDivisi &&
							fromJabatan &&
							toJabatan &&
							fromGolongan &&
							toGolongan
						}
					>
						<AccordionItem border='none'>
							<AccordionButton display='flex' justifyContent='space-between' p={0} _hover={{ bg: "inherit" }}>
								<Text fontSize={{ base: "lg", md: "xl" }} fontWeight='semibold'>
									Dokumen Mutasi
								</Text>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel display='flex' flexDirection='column' pt={4} pb={0} px={0} gap={6}>
								<FilesMutasiList mutasi={mutasi} dokumen={dokumen} />
							</AccordionPanel>
						</AccordionItem>
					</Skeleton>
				</Accordion>
			</CardFooter>
		</Card>
	);
}

function DynamicDetailMutasi({ from, to }) {
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");
	const fontFileMutasiColor = useColorModeValue("black", "whiteAlpha.700");

	if (from !== to)
		return (
			<Text fontSize='sm' casing='capitalize' color={fontFileColor} noOfLines={1}>
				{from?.nama} &rarr;{" "}
				<Text as='u' color={fontFileMutasiColor}>
					{to?.nama}
				</Text>
			</Text>
		);
	return (
		<Text fontSize='sm' casing='capitalize' color={fontFileMutasiColor} noOfLines={1}>
			{from?.nama}
		</Text>
	);
}
