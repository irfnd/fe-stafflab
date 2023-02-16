import useClaims from "@/helpers/hooks/useClaims";
import { useState } from "react";

// Styles & Icons
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { CheckCircle, MoreHorizontal, Trash2 } from "lucide-react";

// Components
import MutasiProsesModal from "@/components/modals/mutasi/MutasiProsesModal";
import MutasiDeleteModal from "@/components/modals/mutasi/MutasiDeleteModal";

export default function MutasiCardMenu({ mutasi }) {
	const [selectedMutasi, setSelectedMutasi] = useState();
	const claims = useClaims();

	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const modalOpen = (type, selectMutasi) => {
		setSelectedMutasi(selectMutasi);
		if (type === "update") disclosureUpdate.onOpen();
		if (type === "delete") disclosureDelete.onOpen();
	};

	return (
		<>
			<Menu>
				<MenuButton as={IconButton} colorScheme='cyan' variant='ghost' icon={<MoreHorizontal size={20} />} />
				<MenuList>
					{claims && claims === "MANAJER" ? (
						<MenuItem icon={<CheckCircle size={16} />} onClick={() => modalOpen("update", mutasi)}>
							Setujui
						</MenuItem>
					) : (
						<MenuItem icon={<Trash2 size={16} />} onClick={() => modalOpen("delete", mutasi)}>
							Hapus
						</MenuItem>
					)}
				</MenuList>
			</Menu>
			<MutasiProsesModal disclosure={disclosureUpdate} mutasi={selectedMutasi} />
			<MutasiDeleteModal disclosure={disclosureDelete} mutasi={selectedMutasi} />
		</>
	);
}
