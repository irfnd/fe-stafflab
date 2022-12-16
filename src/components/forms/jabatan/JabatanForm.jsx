import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function JabatanForm() {
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);

	const { watch } = useFormContext();

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
			<Input
				type='select'
				name='idDivisi'
				label='Nama Divisi'
				placeholder='Pilih Nama Divisi'
				options={divisi?.filter((el) => el.idInstansi === parseInt(watch("idInstansi"), 10)).map((el) => ({ value: el.id, text: el.nama }))}
				shadow='md'
				rounded='md'
			/>
			<Input name='nama' label='Nama Jabatan' placeholder='Masukan Nama Jabatan' shadow='md' rounded='md' />
		</Flex>
	);
}
