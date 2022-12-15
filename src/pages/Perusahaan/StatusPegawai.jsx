// Styles & Icons
import { Flex, Text } from "@chakra-ui/react";

// Components
import BasePagination from "@/components/layouts/paginations/BasePagination";

export default function StatusPegawai() {
	const totalPages = 10;

	return (
		<Flex direction='column' w='full' gap={8}>
			<Text>Instansi Perusahaan</Text>
			<BasePagination totalPages={totalPages} />
		</Flex>
	);
}
