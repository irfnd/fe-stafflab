// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function GolonganForm() {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input name='nama' label='Nama Golongan' placeholder='Masukan Nama Golongan' shadow='md' rounded='md' />
			<Input type='textarea' name='keterangan' label='Keterangan' placeholder='Masukan Keterangan' shadow='md' rounded='md' rows={5} />
		</Flex>
	);
}
