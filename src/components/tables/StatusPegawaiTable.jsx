import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

// Styles & Icons
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Edit, Trash } from "lucide-react";

// Components
import StatusPegawaiDeleteModal from "@/components/modals/statusPegawai/StatusPegawaiDeleteModal";
import StatusPegawaiModal from "@/components/modals/statusPegawai/StatusPegawaiModal";

export default function StatusPegawaiTable() {
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);
	const [selectedStatusPegawai, setSelectedStatusPegawai] = useState();
	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const bgTable = useColorModeValue("white", "gray.800");

	const modalOpen = (type, selectStatusPegawai) => {
		setSelectedStatusPegawai(selectStatusPegawai);
		if (type === "update") disclosureUpdate.onOpen();
		if (type === "delete") disclosureDelete.onOpen();
	};

	return (
		<>
			<TableContainer bg={bgTable} shadow='md' rounded='md'>
				<Table size={{ base: "md", lg: "lg" }} variant='simple'>
					<Thead>
						<Tr>
							<Th w={1}>
								<Text>#</Text>
							</Th>
							<Th>
								<Text>Nama Status Pegawai</Text>
							</Th>
							<Th>
								<Text align='center'>Aksi</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{statusPegawai?.map((el, i) => (
							<Tr key={el.id}>
								<Td w={1}>{i + 1}</Td>
								<Td>{el.nama}</Td>
								<Td display='flex' justifyContent='center' gap={2}>
									<IconButton size='sm' colorScheme='cyan' icon={<Edit size={18} />} onClick={() => modalOpen("update", el)} />
									<IconButton size='sm' colorScheme='red' icon={<Trash size={18} />} onClick={() => modalOpen("delete", el)} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<StatusPegawaiModal type='update' disclosure={disclosureUpdate} statusPegawai={selectedStatusPegawai} />
			<StatusPegawaiDeleteModal disclosure={disclosureDelete} statusPegawai={selectedStatusPegawai} />
		</>
	);
}
