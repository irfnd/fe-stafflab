// Styles & Icons
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import GolonganTable from "@/components/tables/GolonganTable";
import GolonganModal from "@/components/modals/golongan/GolonganModal";

export default function Golongan() {
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
				Tambah Golongan
			</Button>
			<GolonganTable />
			<GolonganModal disclosure={disclosureAdd} />
		</Flex>
	);
}
