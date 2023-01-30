import useDokumen from "@/helpers/hooks/useDokumen";
import usePegawai from "@/helpers/hooks/usePegawai";
import useQueryParams from "@/helpers/hooks/useQueryParams";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import SearchPegawaiForm from "@/components/forms/SearchPegawaiForm";
import BasePagination from "@/components/layouts/paginations/BasePagination";
import PegawaiOutsourcingList from "@/components/lists/PegawaiOutsourcingList";

export default function Outsourcing() {
	const { queryParams } = useQueryParams();
	const { totalPages } = usePegawai(queryParams);
	useDokumen();

	return (
		<Flex direction='column' w='full' h='full' gap={8}>
			<SearchPegawaiForm />
			<PegawaiOutsourcingList />
			<BasePagination page={queryParams.page} totalPages={totalPages} />
		</Flex>
	);
}
