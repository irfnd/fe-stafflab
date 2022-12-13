// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function DokumenLamaranForm() {
	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
				Dokumen Lamaran Pegawai
			</Heading>
			<SimpleGrid columns={{ base: 1, md: 2 }} w='full' gap={6}>
				<Input type='file' name='akta' label='Akta Kelahiran' file='docs' />
				<Input type='file' name='suratLamaran' label='Surat Lamaran' file='docs' />
				<Input type='file' name='cv' label='CV (Curriculum Vitae)' file='docs' />
				<Input type='file' name='suratSehat' label='Surat Keterangan Sehat' file='docs' />
				<Input type='file' name='skck' label='Surat Keterangan Catatan Kriminal' file='docs' />
				<Input type='file' name='suratKerja' label='Surat Persetujuan Kerja' file='docs' />
			</SimpleGrid>
		</Flex>
	);
}
