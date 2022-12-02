import { useState } from "react";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import PegawaiAktifList from "@/components/lists/PegawaiAktifList";
import SearchForm from "@/components/forms/SearchForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";

export default function Aktif() {
	const [Page, setPage] = useState(1);
	const totalPages = 10;

	return (
		<Flex direction="column" w="full" gap={8}>
			<SearchForm />
			<PegawaiAktifList />
			<BasePagination handlePage={{ Page, setPage, totalPages }} />
		</Flex>
	);
}
