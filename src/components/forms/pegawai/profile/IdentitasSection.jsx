import { IdentitasSchema } from "@/helpers/Validations";
import { updateDokumen } from "@/helpers/api/databases/dokumenTable";
import { updatePegawai } from "@/helpers/api/databases/pegawaiTable";
import { deletePhoto, getUrlPhoto, uploadPhoto } from "@/helpers/api/storages/foto";
import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, SimpleGrid, Skeleton, useColorModeValue, useToast } from "@chakra-ui/react";

// Components & Constants
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";

export default function IdentitasSection() {
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const jabatan = useSelector(JabatanSelector.selectAll);
	const golongan = useSelector(GolonganSelector.selectAll);
	const [formDisabled, setFormDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const dokumen = useSelector(DokumenSelector.selectAll);
	const fotoProfil = dokumen?.filter((el) => el.kategori === "profil")[0];
	const resolver = yupResolver(IdentitasSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			if (data.foto) {
				await deletePhoto(fotoProfil?.detail?.publicUrl);
				const foto = await uploadPhoto({
					folder: pegawai.nip,
					kategori: "profil",
					file: data.foto,
					namaFile: "Foto Profil",
					pegawai: pegawai.nama,
				});
				const { publicUrl } = getUrlPhoto(foto.path);
				await updateDokumen({ detail: { ...foto, publicUrl: `${publicUrl}?t=${foto.updated_at}` } }, fotoProfil?.id);
			}
			await updatePegawai({ nama: data.nama }, pegawai.nip);
			toast({
				title: "Berhasil Memperbarui Identitas Pegawai.",
				description: "Identitas telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setLoading(false);
			setFormDisabled(true);
		} catch (err) {
			toast({
				title: "Gagal Memperbarui Identitas Pegawai.",
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
			nip: pegawai?.nip,
			nama: pegawai?.nama,
			tipe: pegawai?.idTipe,
			instansi: pegawai?.idInstansi,
			divisi: pegawai?.idDivisi,
			jabatan: pegawai?.idJabatan,
			golongan: pegawai?.idGolongan,
		});
	}, [pegawai, tipePegawai, instansi, divisi, jabatan, golongan, formDisabled]);

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onSubmit)}>
				<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
					<Flex
						direction={{ base: "column", md: "row" }}
						align={{ base: "flex-start", md: "center" }}
						justify={{ md: "space-between" }}
						gap={6}
					>
						<Heading fontSize={{ base: "xl", md: "2xl" }}>Identitas Pegawai</Heading>
						<EditButtonSection formHandler={{ formDisabled, setFormDisabled, loading }} />
					</Flex>
					<Flex direction={{ base: "column", md: "row" }} gap={6}>
						<Flex direction='column' w={{ base: "full", md: "50%", xl: "30%" }}>
							<Skeleton
								isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil}
								display='flex'
								flexDirection='column'
								rounded='md'
								gap={2}
							>
								<Input
									type='photo'
									name='foto'
									label='Foto Profil'
									file='images'
									value={fotoProfil?.detail?.publicUrl}
									h={256}
									disabled={formDisabled}
								/>
							</Skeleton>
						</Flex>
						<Flex w={{ base: "full", md: "50%", xl: "70%" }} direction='column' gap={6}>
							<Skeleton
								isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil}
								rounded='md'
							>
								<Input name='nip' type='number' label='NIP' placeholder='Masukan NIP' shadow='md' rounded='md' disabled />
							</Skeleton>
							<Skeleton
								isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil}
								rounded='md'
							>
								<Input name='nama' label='Nama' placeholder='Masukan Nama' shadow='md' rounded='md' disabled={formDisabled} />
							</Skeleton>
							<Skeleton
								isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil}
								rounded='md'
							>
								<Input
									type='select'
									name='tipe'
									label='Tipe Pegawai'
									placeholder='Pilih Tipe Pegawai'
									options={tipePegawai?.filter((el) => el.nama !== "Aktif").map((el) => ({ value: el.id, text: el.nama }))}
									shadow='md'
									rounded='md'
									disabled
								/>
							</Skeleton>
						</Flex>
					</Flex>
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
						<Skeleton isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil} rounded='md'>
							<Input
								type='select'
								name='instansi'
								label='Instansi'
								placeholder='Pilih Instansi'
								options={instansi?.map((el) => ({ value: el.id, text: el.nama }))}
								shadow='md'
								rounded='md'
								disabled
							/>
						</Skeleton>
						<Skeleton isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil} rounded='md'>
							<Input
								type='select'
								name='divisi'
								label='Divisi'
								placeholder='Pilih Divisi'
								options={divisi
									?.filter((el) => el.idInstansi === parseInt(mainForm.watch("instansi"), 10))
									.map((el) => ({ value: el.id, text: el.nama }))}
								shadow='md'
								rounded='md'
								disabled
							/>
						</Skeleton>
					</SimpleGrid>
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
						<Skeleton isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil} rounded='md'>
							<Input
								type='select'
								name='jabatan'
								label='Jabatan'
								placeholder='Pilih Jabatan'
								options={jabatan
									?.filter(
										(el) =>
											el.idInstansi === parseInt(mainForm.watch("instansi"), 10) && el.idDivisi === parseInt(mainForm.watch("divisi"), 10)
									)
									.map((el) => ({ value: el.id, text: el.nama }))}
								shadow='md'
								rounded='md'
								disabled
							/>
						</Skeleton>
						<Skeleton isLoaded={tipePegawai && instansi && divisi && jabatan && golongan && pegawai && dokumen && fotoProfil} rounded='md'>
							<Input
								type='select'
								name='golongan'
								label='Golongan'
								placeholder='Pilih Golongan'
								options={golongan?.map((el) => ({ value: el.id, text: el.nama }))}
								shadow='md'
								rounded='md'
								disabled
							/>
						</Skeleton>
					</SimpleGrid>
				</Flex>
			</form>
		</FormProvider>
	);
}
