import { getNewMutasi } from "@/helpers/api/databases/mutasiTable";
import useDate from "@/helpers/hooks/useDate";
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
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Button,
	Icon,
} from "@chakra-ui/react";

// Components
import DetailMutasiPopover from "@/components/popovers/DetailMutasiPopover";

export default function MutasiBaruTable() {
	const [tableData, setTableData] = useState();
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);

	// Colormode
	const bgTable = useColorModeValue("white", "gray.800");

	const fetchData = async () => {
		const results = await getNewMutasi();
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
						{tableData && tipePegawai ? (
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
										<DetailMutasiPopover mutasi={mutasi} />
									</Td>
									<Td>{useDate(mutasi?.tanggalMutasi, false)}</Td>
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
