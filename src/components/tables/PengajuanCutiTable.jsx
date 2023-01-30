import { CutiSelector } from "@/helpers/redux/slices/CutiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDate from "@/helpers/hooks/useDate";

// Styles & Icons
import {
	ButtonGroup,
	IconButton,
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
import { Check, X } from "lucide-react";

// Components
import PengajuanCutiModal from "@/components/modals/cuti/PengajuanCutiModal";
import PengajuanCutiModalDelete from "@/components/modals/cuti/PengajuanCutiModalDelete";

export default function PengajuanCutiTable() {
	const [selectedCuti, setSelectedCuti] = useState();
	const cuti = useSelector(CutiSelector.selectAll);

	const disclosureApprove = useDisclosure();
	const disclosureDeny = useDisclosure();

	const bgTable = useColorModeValue("white", "gray.800");

	const modalOpen = (type, selectCuti) => {
		setSelectedCuti(selectCuti);
		if (type === "approve") disclosureApprove.onOpen();
		if (type === "deny") disclosureDeny.onOpen();
	};

	return (
		<>
			<TableContainer bg={bgTable} shadow='md' rounded='md'>
				<Table size={{ base: "md", lg: "lg" }} variant='simple'>
					<Thead>
						<Tr>
							<Th>
								<Text>Nama Pegawai</Text>
							</Th>
							<Th>
								<Text>Mulai Cuti</Text>
							</Th>
							<Th>
								<Text>Selesai Cuti</Text>
							</Th>
							<Th>
								<Text>Keterangan</Text>
							</Th>
							<Th w={4}>
								<Text align='center'>Aksi</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{cuti &&
							cuti
								.filter((el) => el?.diterima === false)
								.map((el) => (
									<Tr key={el?.id}>
										<Td>{el?.pegawai?.nama}</Td>
										<Td>{useDate(el?.mulaiCuti, false)}</Td>
										<Td>{useDate(el?.selesaiCuti, false)}</Td>
										<Td>{el?.keterangan}</Td>
										<Td w={4}>
											<ButtonGroup display='flex' justifyContent='center' w='full'>
												<IconButton size='sm' colorScheme='cyan' icon={<Check size={18} />} onClick={() => modalOpen("approve", el)} />
												<IconButton size='sm' colorScheme='red' icon={<X size={18} />} onClick={() => modalOpen("deny", el)} />
											</ButtonGroup>
										</Td>
									</Tr>
								))}
					</Tbody>
				</Table>
			</TableContainer>
			<PengajuanCutiModal disclosure={disclosureApprove} cuti={selectedCuti} />
			<PengajuanCutiModalDelete disclosure={disclosureDeny} cuti={selectedCuti} />
		</>
	);
}
