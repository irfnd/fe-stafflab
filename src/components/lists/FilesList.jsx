import { useSelector } from "react-redux";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";

// Styles & Icons
import { Flex, Heading, Button, SimpleGrid } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import FileCard from "@/components/cards/FileCard";

export default function FilesList({ files, category }) {
	const dokumen = useSelector(DokumenSelector.selectAll);
	const dokumenPribadi = dokumen?.filter((el) => el.kategori === category);

	return (
		<Flex direction='column' gap={6}>
			<Flex direction={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} justify={{ md: "space-between" }} gap={6}>
				<Heading fontSize={{ base: "lg", md: "xl" }}>Dokumen Berkaitan</Heading>
				<Button variant='outline' colorScheme='cyan' size='sm' leftIcon={<Plus size={18} />} w={{ base: "full", md: "fit-content" }}>
					Tambah
				</Button>
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
				{dokumen && dokumenPribadi.map((file, i) => <FileCard key={i} file={file} />)}
			</SimpleGrid>
		</Flex>
	);
}
