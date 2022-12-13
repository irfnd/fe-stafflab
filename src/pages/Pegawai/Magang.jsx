// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchForm from "@/components/forms/SearchForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiMagangList from "@/components/lists/PegawaiMagangList";

export default function Magang() {
	const totalPages = 10;

	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchForm />
			<PegawaiMagangList />
			<BasePagination totalPages={totalPages} />
		</Flex>
	);
}
