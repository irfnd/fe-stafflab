import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function IdentitasForm() {
	const [pegawaiLama, setPegawaiLama] = useState(false);
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const jabatan = useSelector(JabatanSelector.selectAll);
	const golongan = useSelector(GolonganSelector.selectAll);

	const { watch } = useFormContext();

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<Flex w='full' direction={{ base: "column", md: "row" }} justify='space-between' gap={8}>
				<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
					Identitas Pegawai
				</Heading>
				<Input type='switch' label='Pegawai Lama' value={pegawaiLama} onChange={() => setPegawaiLama(!pegawaiLama)} />
			</Flex>
			<Flex direction={{ base: "column", md: "row" }} gap={6}>
				<Flex direction='column' w={{ base: "full", md: "50%", xl: "30%" }} gap={2}>
					<Input type='photo' name='foto' label='Foto Profil' file='images' h={256} />
				</Flex>
				<Flex w={{ base: "full", md: "50%", xl: "70%" }} direction='column' gap={6}>
					<Input name='nip' type='number' label='NIP' placeholder='Masukan NIP' shadow='md' rounded='md' />
					<Input name='nama' label='Nama Pegawai' placeholder='Masukan Nama' shadow='md' rounded='md' />
					<Input
						type='select'
						name='tipe'
						label='Tipe Pegawai'
						placeholder='Pilih Tipe Pegawai'
						options={
							pegawaiLama
								? tipePegawai?.map((el) => ({ value: el.id, text: el.nama }))
								: tipePegawai?.filter((el) => el.nama !== "Tetap").map((el) => ({ value: el.id, text: el.nama }))
						}
						shadow='md'
						rounded='md'
					/>
				</Flex>
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
				<Input
					type='select'
					name='instansi'
					label='Instansi Pegawai'
					placeholder='Pilih Instansi'
					options={instansi?.map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
				<Input
					type='select'
					name='divisi'
					label='Divisi Pegawai'
					placeholder='Pilih Divisi'
					options={divisi?.filter((el) => el.idInstansi === parseInt(watch("instansi"), 10)).map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
				<Input
					type='select'
					name='jabatan'
					label='Jabatan Pegawai'
					placeholder='Pilih Jabatan'
					options={jabatan
						?.filter((el) => el.idInstansi === parseInt(watch("instansi"), 10) && el.idDivisi === parseInt(watch("divisi"), 10))
						.map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
				<Input
					type='select'
					name='golongan'
					label='Golongan Pegawai'
					placeholder='Pilih Golongan'
					options={golongan?.map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
			</SimpleGrid>
		</Flex>
	);
}
