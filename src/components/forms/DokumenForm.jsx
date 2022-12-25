// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function DokumenForm({ value }) {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input name='nama' label='Nama File Dokumen' placeholder='Masukan Nama File Dokumen' shadow='md' rounded='md' />
			<Input type='file' name='dokumen' label='File Dokumen' file='docs' value={value} />
		</Flex>
	);
}
