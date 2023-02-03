import { useState } from "react";

// Styles & Icons
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { MoreHorizontal, Trash2 } from "lucide-react";

// Components
import MutasiDeleteModal from "@/components/modals/mutasi/MutasiDeleteModal";

export default function MutasiCardMenu({ mutasi }) {
	const [selectedMutasi, setSelectedMutasi] = useState();

	const disclosureDelete = useDisclosure();

	const modalOpen = (type, selectMutasi) => {
		setSelectedMutasi(selectMutasi);
		disclosureDelete.onOpen();
	};

	return (
		<>
			<Menu>
				<MenuButton as={IconButton} colorScheme='cyan' variant='ghost' icon={<MoreHorizontal size={20} />} />
				<MenuList>
					<MenuItem icon={<Trash2 size={16} />} onClick={() => modalOpen("delete", mutasi)}>
						Hapus
					</MenuItem>
				</MenuList>
			</Menu>
			<MutasiDeleteModal disclosure={disclosureDelete} mutasi={selectedMutasi} />
		</>
	);
}
