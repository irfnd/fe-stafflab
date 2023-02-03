import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
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
import { Edit, Trash2 } from "lucide-react";

// Components
import JabatanDeleteModal from "@/components/modals/jabatan/JabatanDeleteModal";
import JabatanModal from "@/components/modals/jabatan/JabatanModal";

export default function JabatanTable() {
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const jabatan = useSelector(JabatanSelector.selectAll);
	const [selectedJabatan, setSelectedJabatan] = useState();
	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const bgTable = useColorModeValue("white", "gray.800");

	const modalOpen = (type, selectJabatan) => {
		setSelectedJabatan(selectJabatan);
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
								<Text>Nama Jabatan</Text>
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
						{jabatan?.map((el, i) => (
							<Tr key={el.id}>
								<Td w={1}>{i + 1}</Td>
								<Td>{el.nama}</Td>
								<Td>{divisi?.filter((item) => item.id === el.idDivisi)[0]?.nama}</Td>
								<Td>{instansi?.filter((item) => item.id === el.idInstansi)[0]?.nama}</Td>
								<Td w={4}>
									<ButtonGroup display='flex' justifyContent='center' w='full'>
										<IconButton size='sm' colorScheme='cyan' icon={<Edit size={18} />} onClick={() => modalOpen("update", el)} />
										<IconButton size='sm' colorScheme='red' icon={<Trash2 size={18} />} onClick={() => modalOpen("delete", el)} />
									</ButtonGroup>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<JabatanModal type='update' disclosure={disclosureUpdate} jabatan={selectedJabatan} />
			<JabatanDeleteModal disclosure={disclosureDelete} jabatan={selectedJabatan} />
		</>
	);
}
