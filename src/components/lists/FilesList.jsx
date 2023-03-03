import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { Button, Flex, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import FileCard from "@/components/cards/FileCard";
import DokumenModal from "@/components/modals/dokumen/DokumenModal";
import NoData from "@/components/others/NoData";

export default function FilesList({ category, withTitle = true, withAddBtn = true, fileCardBtn = true }) {
	const dokumen = useSelector(DokumenSelector.selectAll);
	const dokumenPribadi = dokumen?.filter((el) => el.kategori === category);

	const disclosureAdd = useDisclosure();

	return (
		<Flex direction='column' w='full' gap={6}>
			{withTitle && withAddBtn && (
				<Flex
					direction={{ base: "column", md: "row" }}
					align={{ base: "flex-start", md: "center" }}
					justify={{ md: "space-between" }}
					gap={6}
				>
					{withTitle && <Heading fontSize={{ base: "lg", md: "xl" }}>Dokumen Berkaitan</Heading>}
					{withAddBtn && (
						<Button
							variant='outline'
							colorScheme='cyan'
							size='sm'
							leftIcon={<Plus size={18} />}
							w={{ base: "full", md: "fit-content" }}
							onClick={disclosureAdd.onOpen}
						>
							Tambah
						</Button>
					)}
				</Flex>
			)}
			{["lamaran", "pribadi"].includes(category) ? (
				dokumen && dokumenPribadi.length > 0 ? (
					<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
						{dokumenPribadi.map((file, i) => (
							<FileCard key={i} file={file} cardBtn={fileCardBtn} />
						))}
					</SimpleGrid>
				) : (
					<NoData page={category} inProfile />
				)
			) : (
				<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
					{dokumen && dokumenPribadi.map((file, i) => <FileCard key={i} file={file} cardBtn={fileCardBtn} />)}
				</SimpleGrid>
			)}
			<DokumenModal disclosure={disclosureAdd} category={category} />
		</Flex>
	);
}
