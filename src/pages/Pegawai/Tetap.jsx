import usePegawai from "@/helpers/hooks/usePegawai";
import useQueryParams from "@/helpers/hooks/useQueryParams";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchForm from "@/components/forms/SearchForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiTetapList from "@/components/lists/PegawaiTetapList";

export default function Tetap() {
	const { queryParams } = useQueryParams();
	const { totalPages } = usePegawai({ ...queryParams, type: 1 });

	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchForm />
			<PegawaiTetapList />
			<BasePagination page={queryParams.page} totalPages={totalPages} />
		</Flex>
	);
}
