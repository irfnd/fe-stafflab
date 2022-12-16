import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";
import { Agama, JenisKelamin, StatusPernikahan } from "@/constants/InputProps";

export default function DataDiriSection() {
	const [formDisabled, setFormDisabled] = useState(true);
	const mainForm = useForm({
		mode: "onChange",
		defaultValues: {},
	});

	return (
		<FormProvider {...mainForm}>
			<Flex direction='column' gap={6}>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
					<Input name='nik' type='number' label='NIK' placeholder='Masukan NIK' shadow='md' rounded='md' order={1} />
					<Input
						name='tempatLahir'
						label='Tempat Lahir'
						placeholder='Masukan Tempat Lahir'
						shadow='md'
						rounded='md'
						order={{ base: 2, md: 3 }}
					/>
					<Input
						name='tanggalLahir'
						type='date'
						label='Tanggal Lahir'
						placeholder='Masukan Tanggal Lahir'
						shadow='md'
						rounded='md'
						order={{ base: 2, md: 3 }}
					/>
					<Input
						name='jenisKelamin'
						type='select'
						label='Jenis Kelamin'
						placeholder='Pilih Jenis Kelamin'
						options={JenisKelamin}
						shadow='md'
						rounded='md'
						order={{ base: 3, md: 2 }}
					/>
					<Input name='agama' type='select' label='Agama' placeholder='Pilih Agama' options={Agama} shadow='md' rounded='md' order={4} />
					<Input
						name='kawin'
						type='select'
						label='Status Pernikahan'
						placeholder='Pilih Status Pernikahan'
						options={StatusPernikahan}
						defaultValue='false'
						shadow='md'
						rounded='md'
						order={5}
					/>
				</SimpleGrid>
				<Input name='alamat' label='Alamat' placeholder='Masukan Alamat' shadow='md' rounded='md' />
			</Flex>
		</FormProvider>
	);
}
