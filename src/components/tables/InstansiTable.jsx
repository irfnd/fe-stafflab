import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

// Styles & Icons
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Edit, Trash } from "lucide-react";

// Components
import InstansiDeleteModal from "@/components/modals/instansi/InstansiDeleteModal";
import InstansiModal from "@/components/modals/instansi/InstansiModal";

export default function InstansiTable() {
	const instansi = useSelector(InstansiSelector.selectAll);
	const [selectedInstansi, setSelectedInstansi] = useState();
	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const bgTable = useColorModeValue("white", "gray.800");

	const modalOpen = (type, selectInstansi) => {
		setSelectedInstansi(selectInstansi);
		if (type === "update") disclosureUpdate.onOpen();
		if (type === "delete") disclosureDelete.onOpen();
	};

	return (
		<>
			<TableContainer bg={bgTable} shadow='md' rounded='md'>
				<Table size={{ base: "md", lg: "lg" }} variant='simple'>
					<Thead>
						<Tr>
							<Th>
								<Text>Nama Instansi</Text>
							</Th>
							<Th>
								<Text>Alamat Instansi</Text>
							</Th>
							<Th>
								<Text align='center'>Aksi</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{instansi?.map((el) => (
							<Tr key={el.id}>
								<Td>{el.nama}</Td>
								<Td>{el.alamat}</Td>
								<Td display='flex' justifyContent='center' gap={2}>
									<IconButton size='sm' colorScheme='cyan' icon={<Edit size={18} />} onClick={() => modalOpen("update", el)} />
									<IconButton size='sm' colorScheme='red' icon={<Trash size={18} />} onClick={() => modalOpen("delete", el)} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<InstansiModal type='update' disclosure={disclosureUpdate} instansi={selectedInstansi} />
			<InstansiDeleteModal disclosure={disclosureDelete} instansi={selectedInstansi} />
		</>
	);
}
