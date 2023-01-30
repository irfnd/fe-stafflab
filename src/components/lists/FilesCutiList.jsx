// Styles & Icons
import { Flex, SimpleGrid } from "@chakra-ui/react";

// Components
import FileCard from "@/components/cards/FileCard";

export default function FilesCutiList({ cuti, dokumen }) {
	const selectedDokumenId = cuti?.dokumen?.files?.map((el) => el.id);
	const selectedDokumen = dokumen?.filter((el) => el.kategori === "cuti" && selectedDokumenId?.includes(el.id));

	return (
		<Flex direction='column' w='full' gap={6}>
			<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
				{selectedDokumen && selectedDokumen.map((file, i) => <FileCard key={i} file={file} cardBtn={false} />)}
			</SimpleGrid>
		</Flex>
	);
}
