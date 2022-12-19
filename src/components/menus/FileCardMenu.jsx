// Styles & Icons
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MoreHorizontal, Edit, Trash } from "lucide-react";

// Components

export default function FileCardMenu({ disclosure }) {
	const { disclosureUpdate, disclosureDelete } = disclosure;

	return (
		<Menu size='xs'>
			<MenuButton as={IconButton} colorScheme='cyan' variant='ghost' size='sm' icon={<MoreHorizontal size={20} />} />
			<MenuList>
				<MenuItem icon={<Edit size={16} />}>Edit</MenuItem>
				<MenuItem icon={<Trash size={16} />}>Hapus</MenuItem>
			</MenuList>
		</Menu>
	);
}
