import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components & Constants
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";

export default function IdentitasSection() {
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const jabatan = useSelector(JabatanSelector.selectAll);
	const golongan = useSelector(GolonganSelector.selectAll);
	const [formDisabled, setFormDisabled] = useState(true);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const mainForm = useForm({ mode: "onChange" });

	useEffect(() => {
		mainForm.reset({
			nip: pegawai?.nip,
			nama: pegawai?.nama,
			status: pegawai?.idStatus,
			instansi: pegawai?.idInstansi,
			divisi: pegawai?.idDivisi,
			jabatan: pegawai?.idJabatan,
			golongan: pegawai?.idGolongan,
		});
	}, [pegawai, statusPegawai, instansi, divisi, jabatan, golongan]);

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<FormProvider {...mainForm}>
			<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
				<Flex direction={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} justify={{ md: "space-between" }} gap={6}>
					<Heading fontSize={{ base: "xl", md: "2xl" }}>Identitas Pegawai</Heading>
					<EditButtonSection formHandler={{ formDisabled, setFormDisabled }} />
				</Flex>
				<Flex direction={{ base: "column", md: "row" }} gap={6}>
					<Flex direction='column' w={{ base: "full", md: "50%", xl: "30%" }} gap={2}>
						<Input type='photo' name='foto' label='Foto Profil' file='images' h={256} />
					</Flex>
					<Flex w={{ base: "full", md: "50%", xl: "70%" }} direction='column' gap={6}>
						<Input name='nip' type='number' label='NIP' placeholder='Masukan NIP' shadow='md' rounded='md' disabled={formDisabled} />
						<Input name='nama' label='Nama' placeholder='Masukan Nama' shadow='md' rounded='md' disabled={formDisabled} />
						<Input
							type='select'
							name='status'
							label='Status'
							placeholder='Pilih Status'
							options={statusPegawai?.filter((el) => el.nama !== "Aktif").map((el) => ({ value: el.id, text: el.nama }))}
							shadow='md'
							rounded='md'
							disabled={formDisabled}
						/>
					</Flex>
				</Flex>
				<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
					<Input
						type='select'
						name='instansi'
						label='Instansi'
						placeholder='Pilih Instansi'
						options={instansi?.map((el) => ({ value: el.id, text: el.nama }))}
						shadow='md'
						rounded='md'
						disabled={formDisabled}
					/>
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
						disabled={formDisabled}
					/>
				</SimpleGrid>
				<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
					<Input
						type='select'
						name='jabatan'
						label='Jabatan'
						placeholder='Pilih Jabatan'
						options={jabatan
							?.filter(
								(el) => el.idInstansi === parseInt(mainForm.watch("instansi"), 10) && el.idDivisi === parseInt(mainForm.watch("divisi"), 10)
							)
							.map((el) => ({ value: el.id, text: el.nama }))}
						shadow='md'
						rounded='md'
						disabled={formDisabled}
					/>
					<Input
						type='select'
						name='golongan'
						label='Golongan'
						placeholder='Pilih Golongan'
						options={golongan?.map((el) => ({ value: el.id, text: el.nama }))}
						shadow='md'
						rounded='md'
						disabled={formDisabled}
					/>
				</SimpleGrid>
			</Flex>
		</FormProvider>
	);
}
