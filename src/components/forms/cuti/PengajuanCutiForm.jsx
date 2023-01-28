// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function PengajuanCutiForm() {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input type='file' name='dokumen' label='Dokumen Cuti' file='docs' />
		</Flex>
	);
}
