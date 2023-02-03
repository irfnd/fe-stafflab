import { useState } from "react";

// Styles & Icons
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

// Components
import PendidikanDeleteModal from "@/components/modals/pendidikan/PendidikanDeleteModal";
import PendidikanModal from "@/components/modals/pendidikan/PendidikanModal";

export default function PendidikanCardMenu({ pendidikan }) {
	const [selectedPendidikan, setSelectedPendidikan] = useState();

	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const modalOpen = (type, selectPendidikan) => {
		setSelectedPendidikan(selectPendidikan);
		if (type === "update") disclosureUpdate.onOpen();
		if (type === "delete") disclosureDelete.onOpen();
	};

	return (
		<>
			<Menu size='xs'>
				<MenuButton as={IconButton} colorScheme='cyan' variant='ghost' size='sm' icon={<MoreHorizontal size={20} />} />
				<MenuList>
					<MenuItem icon={<Edit size={16} />} onClick={() => modalOpen("update", pendidikan)}>
						Edit
					</MenuItem>
					<MenuItem icon={<Trash2 size={16} />} onClick={() => modalOpen("delete", pendidikan)}>
						Hapus
					</MenuItem>
				</MenuList>
			</Menu>
			<PendidikanModal disclosure={disclosureUpdate} type='update' pendidikan={selectedPendidikan} />
			<PendidikanDeleteModal disclosure={disclosureDelete} pendidikan={selectedPendidikan} />
		</>
	);
}
