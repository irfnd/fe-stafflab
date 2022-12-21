import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, SimpleGrid, Heading } from "@chakra-ui/react";

// Components & Constants
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";
import { Agama, JenisKelamin, StatusPernikahan } from "@/constants/InputProps";

export default function DataPribadiSection() {
	const [formDisabled, setFormDisabled] = useState(true);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const mainForm = useForm({ mode: "onChange" });

	useEffect(() => {
		mainForm.reset({
			nik: pegawai?.dataPribadi?.nik,
			tempatLahir: pegawai?.dataPribadi?.tempatLahir,
			tanggalLahir: pegawai?.dataPribadi?.tanggalLahir,
			jenisKelamin: pegawai?.dataPribadi?.jenisKelamin,
			agama: pegawai?.dataPribadi?.agama,
			kawin: pegawai?.dataPribadi?.kawin,
			alamat: pegawai?.dataPribadi?.alamat,
		});
	}, [pegawai]);

	return (
		<FormProvider {...mainForm}>
			<Flex direction={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} justify={{ md: "space-between" }} gap={6}>
				<Heading fontSize={{ base: "lg", md: "xl" }}>Data Berkaitan</Heading>
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
