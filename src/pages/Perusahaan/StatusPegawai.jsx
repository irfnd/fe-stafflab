// Styles & Icons
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import StatusPegawaiTable from "@/components/tables/StatusPegawaiTable";
import StatusPegawaiModal from "@/components/modals/statusPegawai/StatusPegawaiModal";

export default function StatusPegawai() {
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
				Tambah Status Pegawai
			</Button>
			<StatusPegawaiTable />
			<StatusPegawaiModal disclosure={disclosureAdd} />
		</Flex>
	);
}
