// Styles & Icons
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import InstansiTable from "@/components/tables/InstansiTable";
import InstansiModal from "@/components/modals/instansi/InstansiModal";

export default function Instansi() {
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
				Tambah Instansi
			</Button>
			<InstansiTable />
			<InstansiModal disclosure={disclosureAdd} />
		</Flex>
	);
}
