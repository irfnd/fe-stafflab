import { useFormContext } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

// Styles & Icons
import { Button, Flex, Heading, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components & Constants
import FileMutasiCard from "@/components/cards/FileMutasiCard";
import MutasiForm from "@/components/modals/mutasi/MutasiModal";

export default function FileMutasiForm() {
	const disclosureAdd = useDisclosure();
	const { watch, control } = useFormContext();
	const arrayForm = useFieldArray({ control, name: "dokumen" });

	return (
		watch("jenisMutasi") && (
			<Flex direction='column' w='full' gap={4}>
				<Flex direction={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} justify='space-between' gap={4}>
					<Heading fontSize={{ base: "xl", md: "2xl" }}>Dokumen Berkaitan</Heading>
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
				</Flex>
				{arrayForm.fields.length > 0 && (
					<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
						{arrayForm.fields.map((file, i) => (
							<FileMutasiCard key={i} file={{ ...file, index: i }} form={arrayForm} />
						))}
					</SimpleGrid>
				)}
				<MutasiForm disclosure={disclosureAdd} form={arrayForm} />
			</Flex>
		)
	);
}