import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
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
import DivisiDeleteModal from "@/components/modals/divisi/DivisiDeleteModal";
import DivisiModal from "@/components/modals/divisi/DivisiModal";

export default function DivisiTable() {
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const [selectedDivisi, setSelectedDivisi] = useState();
	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const bgTable = useColorModeValue("white", "gray.800");

	const modalOpen = (type, selectDivisi) => {
		setSelectedDivisi(selectDivisi);
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
								<Text>Nama Divisi</Text>
							</Th>
							<Th>
								<Text>Nama Instansi</Text>
							</Th>
							<Th w={4}>
								<Text align='center'>Aksi</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{divisi?.map((el, i) => (
							<Tr key={el.id}>
								<Td w={1}>{i + 1}</Td>
								<Td>{el.nama}</Td>
								<Td>{instansi?.filter((item) => item.id === el.idInstansi)[0]?.nama}</Td>
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
			<DivisiModal type='update' disclosure={disclosureUpdate} divisi={selectedDivisi} />
			<DivisiDeleteModal disclosure={disclosureDelete} divisi={selectedDivisi} />
		</>
	);
}
