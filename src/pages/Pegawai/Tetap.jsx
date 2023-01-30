import useDokumen from "@/helpers/hooks/useDokumen";
import usePegawai from "@/helpers/hooks/usePegawai";
import useQueryParams from "@/helpers/hooks/useQueryParams";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchPegawaiForm from "@/components/forms/SearchPegawaiForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiTetapList from "@/components/lists/PegawaiTetapList";

export default function Tetap() {
	const { queryParams } = useQueryParams();
	const { totalPages } = usePegawai(queryParams);
	useDokumen();

	return (
		<Flex direction='column' w='full' gap={8}>
			<SearchPegawaiForm />
			<PegawaiTetapList />
			<BasePagination page={queryParams.page} totalPages={totalPages} />
		</Flex>
	);
}
