import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

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
							<Th w={1}>
								<Text>#</Text>
							</Th>
							<Th>
								<Text>Nama Instansi</Text>
							</Th>
							<Th>
								<Text>Alamat Instansi</Text>
							</Th>
							<Th w={4}>
								<Text align='center'>Aksi</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{instansi?.map((el, i) => (
							<Tr key={el.id}>
								<Td w={1}>{i + 1}</Td>
								<Td>{el.nama}</Td>
								<Td>{el.alamat}</Td>
								<Td w={4}>
									<ButtonGroup display='flex' justifyContent='center' w='full'>
										<IconButton size='sm' colorScheme='cyan' icon={<Edit size={18} />} onClick={() => modalOpen("update", el)} />
										<IconButton size='sm' colorScheme='red' icon={<Trash size={18} />} onClick={() => modalOpen("delete", el)} />
									</ButtonGroup>
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
