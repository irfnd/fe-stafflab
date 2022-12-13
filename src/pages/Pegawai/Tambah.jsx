// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import TambahForm from "@/components/forms/pegawai/TambahForm";

export default function Tambah() {
	return (
		<Flex direction='column' w='full' gap={8}>
			<TambahForm />
		</Flex>
	);
}
