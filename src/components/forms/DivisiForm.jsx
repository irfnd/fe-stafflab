import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function DivisiForm() {
	const instansi = useSelector(InstansiSelector.selectAll);

	return (
		<Flex direction='column' w='full' gap={4}>
			<Input
				type='select'
				name='idInstansi'
				label='Nama Instansi'
				placeholder='Pilih Nama Instansi'
				options={instansi?.map((el) => ({ value: el.id, text: el.nama }))}
				shadow='md'
				rounded='md'
			/>
			<Input name='nama' label='Nama Divisi' placeholder='Masukan Nama Divisi' shadow='md' rounded='md' />
		</Flex>
	);
}
