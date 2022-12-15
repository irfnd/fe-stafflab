// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function StatusPegawaiForm() {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input name='nama' label='Nama Status Pegawai' placeholder='Masukan Nama Status Pegawai' shadow='md' rounded='md' />
		</Flex>
	);
}
