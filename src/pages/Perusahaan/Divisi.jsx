// Styles & Icons
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import DivisiTable from "@/components/tables/DivisiTable";
import DivisiModal from "@/components/modals/divisi/DivisiModal";

export default function Divisi() {
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
				Tambah Divisi
			</Button>
			<DivisiTable />
			<DivisiModal disclosure={disclosureAdd} />
		</Flex>
	);
}
