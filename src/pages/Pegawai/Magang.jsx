// Styles & Icons
import { Flex, Text } from "@chakra-ui/react";

// Components
import SearchForm from "@/components/forms/SearchForm";

export default function Magang() {
	return (
		<Flex direction="column" w="full" gap={8}>
			<SearchForm />
			<Text>Pegawai Magang Page</Text>
		</Flex>
	);
}
