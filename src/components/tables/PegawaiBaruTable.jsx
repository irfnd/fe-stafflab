import { getNewPegawai } from "@/helpers/api/databases/pegawaiTable";
import useDate from "@/helpers/hooks/useDate";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// Styles & Icons
import {
	Flex,
	Link,
	Skeleton,
	Table,
	TableContainer,
	Tag,
	TagLabel,
	TagLeftIcon,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import { Backpack, CheckCircle, Home, XCircle } from "lucide-react";

export default function PegawaiBaruTable() {
	const [tableData, setTableData] = useState();
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);
	const instansi = useSelector(InstansiSelector.selectAll);

	// Colormode
	const bgTable = useColorModeValue("white", "gray.800");

	const tagDynamic = (status) => {
		switch (status) {
			case "Cuti":
				return { icon: Home, color: "yellow" };
			case "Pensiun":
				return { icon: Backpack, color: "gray" };
			case "PHK":
				return { icon: XCircle, color: "red" };
			default:
				return { icon: CheckCircle, color: "cyan" };
		}
	};

	const fetchData = async () => {
		const results = await getNewPegawai();
		if (results) setTableData(results);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Flex w='full'>
			<TableContainer bg={bgTable} w='full' shadow='md' rounded='md'>
				<Table size={{ base: "md", lg: "lg" }} variant='simple'>
					<Thead>
						<Tr>
							<Th>
								<Text casing='capitalize' fontSize={14}>
									Nama
								</Text>
							</Th>
							<Th>
								<Text align='center' casing='capitalize' fontSize={14}>
									Tipe
								</Text>
							</Th>
							<Th>
								<Text align='center' casing='capitalize' fontSize={14}>
									Status
								</Text>
							</Th>
							<Th>
								<Text casing='capitalize' fontSize={14}>
									Instansi
								</Text>
							</Th>
							<Th w={10}>
								<Text casing='capitalize' fontSize={14}>
									Tanggal Masuk
								</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{tableData && tipePegawai && statusPegawai && instansi ? (
							tableData.map((pegawai, i) => (
								<Tr key={i}>
									<Td>
										<Link
											as={RouterLink}
											to={`/pegawai/${tipePegawai?.filter((tipe) => tipe?.id === pegawai?.idTipe)[0]?.nama.toLowerCase()}/${pegawai?.nip}`}
											fontWeight='semibold'
										>
											{pegawai?.nama}
										</Link>
									</Td>
									<Td>
										<Text align='center'>{tipePegawai?.filter((tipe) => tipe?.id === pegawai?.idTipe)[0]?.nama}</Text>
									</Td>
									<Td>
										<Flex justify='center'>
											<Tag colorScheme={tagDynamic(statusPegawai?.filter((status) => status?.id === pegawai?.idStatus)[0]?.nama).color}>
												<TagLeftIcon as={tagDynamic(statusPegawai?.filter((status) => status?.id === pegawai?.idStatus)[0]?.nama).icon} />
												<TagLabel>{statusPegawai?.filter((status) => status?.id === pegawai?.idStatus)[0]?.nama}</TagLabel>
											</Tag>
										</Flex>
									</Td>
									<Td>{instansi?.filter((el) => el?.id === pegawai?.idInstansi)[0]?.nama}</Td>
									<Td>{useDate(pegawai?.createdAt)}</Td>
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={5}>
									<Skeleton rounded='md' w='full' h={100} />
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	);
}
