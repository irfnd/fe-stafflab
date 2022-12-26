import { useState } from "react";

// Styles & Icons
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

// Components
import DokumenDeleteModal from "@/components/modals/dokumen/DokumenDeleteModal";
import DokumenModal from "@/components/modals/dokumen/DokumenModal";

export default function FileCardMenu({ category, file }) {
	const [selectedDokumen, setSelectedDokumen] = useState();

	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const modalOpen = (type, selectDokumen) => {
		setSelectedDokumen(selectDokumen);
		if (type === "update") disclosureUpdate.onOpen();
		if (type === "delete") disclosureDelete.onOpen();
	};

	return (
		<>
			<Menu size='xs'>
				<MenuButton as={IconButton} colorScheme='cyan' variant='ghost' size='sm' icon={<MoreHorizontal size={20} />} />
				<MenuList>
					<MenuItem icon={<Edit size={16} />} onClick={() => modalOpen("update", file)}>
						Edit
					</MenuItem>
					<MenuItem icon={<Trash size={16} />} onClick={() => modalOpen("delete", file)}>
						Hapus
					</MenuItem>
				</MenuList>
			</Menu>
			<DokumenModal disclosure={disclosureUpdate} type='update' category={category} dokumen={selectedDokumen} />
			<DokumenDeleteModal disclosure={disclosureDelete} dokumen={selectedDokumen} />
		</>
	);
}
