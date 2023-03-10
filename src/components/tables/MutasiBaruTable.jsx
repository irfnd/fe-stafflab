import { getNewMutasi } from "@/helpers/api/databases/mutasiTable";
import useDate from "@/helpers/hooks/useDate";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// Styles & Icons
import {
	Button,
	Flex,
	Icon,
	Link,
	Skeleton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { Eye } from "lucide-react";

// Components
import DetailMutasiModal from "@/components/modals/dashboard/DetailMutasiModal";

export default function MutasiBaruTable() {
	const [detailMutasi, setDetailMutasi] = useState();
	const [tableData, setTableData] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const disclosureDetail = useDisclosure();

	// Colormode
	const bgTable = useColorModeValue("white", "gray.800");

	const showDetail = (data) => {
		setDetailMutasi(data);
		disclosureDetail.onOpen();
	};

	const fetchData = async () => {
		const results = await getNewMutasi();
		if (results) {
			setTableData(results);
			setIsLoaded(true);
		}
	};

	useEffect(() => {
		fetchData();
		return () => {
			setIsLoaded(false);
		};
	}, []);

	return (
		<Flex w='full'>
			<TableContainer bg={bgTable} w='full' shadow='md' rounded='md'>
				<Table size={{ base: "md", lg: "lg" }} variant='simple'>
					<Thead>
						<Tr>
							<Th>
								<Text casing='capitalize' fontSize={14}>
									Nama Pegawai
								</Text>
							</Th>
							<Th textAlign='center'>
								<Text casing='capitalize' fontSize={14}>
									Jenis Mutasi
								</Text>
							</Th>
							<Th textAlign='center'>
								<Text casing='capitalize' fontSize={14}>
									Detail Mutasi
								</Text>
							</Th>
							<Th w={10}>
								<Text casing='capitalize' fontSize={14}>
									Tanggal Mutasi
								</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{isLoaded && tipePegawai ? (
							tableData?.length !== 0 ? (
								tableData.map((mutasi, i) => (
									<Tr key={i}>
										<Td>
											<Link
												as={RouterLink}
												to={`/pegawai/${tipePegawai?.filter((tipe) => tipe?.id === mutasi?.pegawai?.idTipe)[0]?.nama.toLowerCase()}/${
													mutasi?.nipPegawai
												}`}
												fontWeight='semibold'
											>
												{mutasi?.pegawai?.nama}
											</Link>
										</Td>
										<Td textAlign='center'>
											<Text casing='capitalize'>Mutasi {mutasi?.jenisMutasi}</Text>
										</Td>
										<Td textAlign='center'>
											<Button
												size='sm'
												variant='ghost'
												colorScheme='cyan'
												leftIcon={<Icon as={Eye} fontSize={18} />}
												onClick={() => showDetail(mutasi)}
											>
												Lihat Detail
											</Button>
										</Td>
										<Td>{useDate(mutasi?.tanggalMutasi, false)}</Td>
									</Tr>
								))
							) : (
								<Tr>
									<Td colSpan={4}>
										<Text casing='capitalize' align='center'>
											Data mutasi terbaru belum tersedia.
										</Text>
									</Td>
								</Tr>
							)
						) : (
							<Tr>
								<Td colSpan={4}>
									<Skeleton rounded='md' w='full' h='20px' />
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</TableContainer>
			<DetailMutasiModal disclosure={disclosureDetail} mutasi={detailMutasi} />
		</Flex>
	);
}
