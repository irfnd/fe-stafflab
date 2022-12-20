import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

// Styles & Icons
import { IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Edit, Trash } from "lucide-react";

// Components
import GolonganDeleteModal from "@/components/modals/golongan/GolonganDeleteModal";
import GolonganModal from "@/components/modals/golongan/GolonganModal";

export default function GolonganTable() {
	const golongan = useSelector(GolonganSelector.selectAll);
	const [selectedGolongan, setSelectedGolongan] = useState();
	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const bgTable = useColorModeValue("white", "gray.800");

	const modalOpen = (type, selectGolongan) => {
		setSelectedGolongan(selectGolongan);
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
								<Text>Nama Golongan</Text>
							</Th>
							<Th>
								<Text>Keterangan</Text>
							</Th>
							<Th>
								<Text align='center'>Aksi</Text>
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{golongan?.map((el, i) => (
							<Tr key={el.id}>
								<Td w={1}>{i + 1}</Td>
								<Td>{el.nama}</Td>
								<Td>{el.keterangan}</Td>
								<Td display='flex' justifyContent='center' gap={2}>
									<IconButton size='sm' colorScheme='cyan' icon={<Edit size={18} />} onClick={() => modalOpen("update", el)} />
									<IconButton size='sm' colorScheme='red' icon={<Trash size={18} />} onClick={() => modalOpen("delete", el)} />
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<GolonganModal type='update' disclosure={disclosureUpdate} golongan={selectedGolongan} />
			<GolonganDeleteModal disclosure={disclosureDelete} golongan={selectedGolongan} />
		</>
	);
}
