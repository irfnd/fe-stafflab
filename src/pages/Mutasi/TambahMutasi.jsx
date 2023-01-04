import usePegawai from "@/helpers/hooks/usePegawai";
import useQueryParams from "@/helpers/hooks/useQueryParams";
import useDokumen from "@/helpers/hooks/useDokumen";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchForm from "@/components/forms/SearchForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiAllList from "@/components/lists/PegawaiAllList";

export default function TambahMutasi() {
	const { queryParams } = useQueryParams();
	const { totalPages } = usePegawai(queryParams);
	useDokumen();

	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchForm />
			<PegawaiAllList />
			<BasePagination page={queryParams.page} totalPages={totalPages} />
		</Flex>
	);
}
