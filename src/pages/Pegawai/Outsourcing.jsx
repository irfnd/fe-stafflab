// Styles & Icons
import { Flex, Text } from "@chakra-ui/react";

// Components
import SearchPegawaiForm from "@/components/forms/SearchPegawaiForm";

export default function Outsourcing() {
	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchPegawaiForm />
			<Text>Pegawai Oursourcing Page</Text>
		</Flex>
	);
}
