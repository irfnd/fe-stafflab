// Styles & Icons
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import JabatanTable from "@/components/tables/JabatanTable";
import JabatanModal from "@/components/modals/jabatan/JabatanModal";

export default function Jabatan() {
	const disclosureAdd = useDisclosure();

	return (
		<Flex direction='column' w='full' gap={8}>
			<Button
				colorScheme='cyan'
				w={{ base: "full", md: "fit-content" }}
				leftIcon={<Plus size={20} />}
				shadow='md'
				onClick={disclosureAdd.onOpen}
			>
				Tambah Jabatan
			</Button>
			<JabatanTable />
			<JabatanModal disclosure={disclosureAdd} />
		</Flex>
	);
}
