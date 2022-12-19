import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Styles & Icons
import { Flex, SimpleGrid, Heading } from "@chakra-ui/react";

// Components & Constants
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";
import { Agama, JenisKelamin, StatusPernikahan } from "@/constants/InputProps";

export default function DataPribadiSection() {
	const [formDisabled, setFormDisabled] = useState(true);
	const mainForm = useForm({ mode: "onChange" });

	return (
		<FormProvider {...mainForm}>
			<Flex align='center' justify='space-between' w='full'>
				<Heading fontSize='xl'>Data Berkaitan</Heading>
				<EditButtonSection formHandler={{ formDisabled, setFormDisabled }} />
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 2 }} w='full' spacing={6}>
				<Input name='nik' type='number' label='NIK' placeholder='Masukan NIK' shadow='md' rounded='md' order={1} disabled={formDisabled} />
				<Input
					name='tempatLahir'
					label='Tempat Lahir'
					placeholder='Masukan Tempat Lahir'
					shadow='md'
					rounded='md'
					order={{ base: 2, md: 3 }}
					disabled={formDisabled}
				/>
				<Input
					name='tanggalLahir'
					type='date'
					label='Tanggal Lahir'
					placeholder='Masukan Tanggal Lahir'
					shadow='md'
					rounded='md'
					order={{ base: 2, md: 3 }}
					disabled={formDisabled}
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
					disabled={formDisabled}
				/>
				<Input
					name='agama'
					type='select'
					label='Agama'
					placeholder='Pilih Agama'
					options={Agama}
					shadow='md'
					rounded='md'
					order={4}
					disabled={formDisabled}
				/>
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
					disabled={formDisabled}
				/>
			</SimpleGrid>
			<Input
				type='textarea'
				name='alamat'
				label='Alamat'
				placeholder='Masukan Alamat'
				shadow='md'
				rounded='md'
				rows={5}
				disabled={formDisabled}
			/>
		</FormProvider>
	);
}
