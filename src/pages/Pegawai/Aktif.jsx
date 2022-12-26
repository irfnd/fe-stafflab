import usePegawai from "@/helpers/hooks/usePegawai";
import useQueryParams from "@/helpers/hooks/useQueryParams";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchForm from "@/components/forms/SearchForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiAktifList from "@/components/lists/PegawaiAktifList";

export default function Aktif() {
	const { queryParams } = useQueryParams();
	const { totalPages } = usePegawai({ ...queryParams, status: 3 });

	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchForm />
			<PegawaiAktifList />
			<BasePagination page={queryParams.page} totalPages={totalPages} />
		</Flex>
	);
}
