import { getNewCuti } from "@/helpers/api/databases/cutiTable";
import useDate from "@/helpers/hooks/useDate";
import { useEffect, useState } from "react";

// Styles & Icons
import { Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";

export default function CutiBaruTable() {
	const [tableData, setTableData] = useState();

	// Colormode
	const bgTable = useColorModeValue("white", "gray.800");

	const fetchData = async () => {
		const results = await getNewCuti();
		if (results) setTableData(results);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<TableContainer bg={bgTable} shadow='md' rounded='md'>
			<Table size={{ base: "md", lg: "lg" }} variant='simple'>
				<Thead>
					<Tr>
						<Th>
							<Text casing='capitalize' fontSize={14}>
								Nama Pegawai
							</Text>
						</Th>
						<Th>
							<Text casing='capitalize' fontSize={14}>
								Mulai Cuti
							</Text>
						</Th>
						<Th>
							<Text casing='capitalize' fontSize={14}>
								Selesai Cuti
							</Text>
						</Th>
						<Th>
							<Text casing='capitalize' fontSize={14}>
								Keterangan
							</Text>
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{tableData ? (
						tableData
							.filter((el) => el?.diterima === true)
							.map((el) => (
								<Tr key={el?.id}>
									<Td>
										<Text casing='capitalize'>{el?.pegawai?.nama}</Text>
									</Td>
									<Td>
										<Text casing='capitalize'>{useDate(el?.mulaiCuti, false)}</Text>
									</Td>
									<Td>
										<Text casing='capitalize'>{useDate(el?.selesaiCuti, false)}</Text>
									</Td>
									<Td>
										<Text casing='capitalize'>{el?.keterangan}</Text>
									</Td>
								</Tr>
							))
					) : (
						<Tr>
							<Td colSpan={4}>
								<Skeleton rounded='md' w='full' h={100} />
							</Td>
						</Tr>
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
