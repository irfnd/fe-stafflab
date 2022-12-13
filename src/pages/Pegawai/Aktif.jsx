// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchForm from "@/components/forms/SearchForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiAktifList from "@/components/lists/PegawaiAktifList";

export default function Aktif() {
	const totalPages = 10;

	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchForm />
			<PegawaiAktifList />
			<BasePagination totalPages={totalPages} />
		</Flex>
	);
}
