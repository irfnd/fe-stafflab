// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function InstansiForm() {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input name='nama' label='Nama Instansi' placeholder='Masukan Nama Instansi' shadow='md' rounded='md' />
			<Input type='textarea' name='alamat' label='Alamat Instansi' placeholder='Masukan Alamat Instansi' shadow='md' rounded='md' rows={8} />
		</Flex>
	);
}
