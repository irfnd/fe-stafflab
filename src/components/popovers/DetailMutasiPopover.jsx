import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import {
	Button,
	Flex,
	Icon,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Award, Building2, Eye, FileBadge, Network, Pocket, Tags } from "lucide-react";

export default function DetailMutasiPopover({ mutasi }) {
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

	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");

	return (
		<Popover placement='top-end'>
			<PopoverTrigger>
				<Button size='sm' variant='ghost' colorScheme='cyan' leftIcon={<Icon as={Eye} fontSize={18} />}>
					Lihat Detail
				</Button>
			</PopoverTrigger>
			<PopoverContent rounded='md' shadow='lg'>
				<PopoverArrow />
				<PopoverCloseButton size='md' />
				<PopoverHeader textAlign='start' fontWeight='semibold'>
					Detail Mutasi
				</PopoverHeader>
				<PopoverBody>
					<Flex direction='column' gap={1}>
						<Flex align='center' gap={2}>
							<Icon as={Tags} color={iconFileColor} />
							{fromTipe && toTipe && <DynamicDetailMutasi from={fromTipe} to={toTipe} />}
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={FileBadge} color={iconFileColor} />
							{fromStatus && toStatus && <DynamicDetailMutasi from={fromStatus} to={toStatus} />}
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Building2} color={iconFileColor} />
							{fromInstansi && toInstansi && <DynamicDetailMutasi from={fromInstansi} to={toInstansi} />}
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Network} color={iconFileColor} />
							{fromDivisi && toDivisi && <DynamicDetailMutasi from={fromDivisi} to={toDivisi} />}
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Award} color={iconFileColor} />
							{fromJabatan && toJabatan && <DynamicDetailMutasi from={fromJabatan} to={toJabatan} />}
						</Flex>
						<Flex align='center' gap={2}>
							<Icon as={Pocket} color={iconFileColor} />
							{fromGolongan && toGolongan && <DynamicDetailMutasi from={fromGolongan} to={toGolongan} />}
						</Flex>
					</Flex>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

function DynamicDetailMutasi({ from, to }) {
	if (from !== to)
		return (
			<Text fontSize='sm' casing='capitalize' noOfLines={1}>
				{from?.nama} &rarr; <Text as='u'>{to?.nama}</Text>
			</Text>
		);
	return (
		<Text fontSize='sm' casing='capitalize' noOfLines={1}>
			{from?.nama}
		</Text>
	);
}
