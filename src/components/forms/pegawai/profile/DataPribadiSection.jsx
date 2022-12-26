import { DataPribadiSchema } from "@/helpers/Validations";
import { DataPribadiSelector } from "@/helpers/redux/slices/DataPribadiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useToast } from "@chakra-ui/react";

// Components & Constants
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";
import { Agama, JenisKelamin, StatusPernikahan } from "@/constants/InputProps";
import { updateDataPribadi } from "@/helpers/api/databases/dataPribadiTable";

export default function DataPribadiSection() {
	const [formDisabled, setFormDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const dataPribadi = useSelector((state) => DataPribadiSelector.selectById(state, params?.id));
	const resolver = yupResolver(DataPribadiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			await updateDataPribadi(data, dataPribadi?.nik);
			toast({
				title: "Berhasil Memperbarui Data Pribadi Pegawai.",
				description: "Data Pribadi telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setLoading(false);
			setFormDisabled(true);
		} catch (err) {
			toast({
				title: "Gagal Memperbarui Data Pribadi Pegawai.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
			setLoading(false);
			setFormDisabled(true);
		}
	};

	useEffect(() => {
		mainForm.reset({
			nik: dataPribadi?.nik,
			tempatLahir: dataPribadi?.tempatLahir,
			tanggalLahir: dataPribadi?.tanggalLahir,
			jenisKelamin: dataPribadi?.jenisKelamin,
			agama: dataPribadi?.agama,
			kawin: dataPribadi?.kawin,
			alamat: dataPribadi?.alamat,
		});
	}, [dataPribadi]);

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
				<Flex
					direction={{ base: "column", md: "row" }}
					align={{ base: "flex-start", md: "center" }}
					justify={{ md: "space-between" }}
					gap={6}
				>
					<Heading fontSize={{ base: "lg", md: "xl" }}>Data Berkaitan</Heading>
					<EditButtonSection formHandler={{ formDisabled, setFormDisabled, loading }} />
				</Flex>
				<SimpleGrid columns={{ base: 1, md: 2 }} w='full' spacing={6}>
					<Input
						name='nik'
						type='number'
						label='NIK'
						placeholder='Masukan NIK'
						shadow='md'
						rounded='md'
						order={1}
						disabled={formDisabled}
					/>
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
			</form>
		</FormProvider>
	);
}
