// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";
import { Agama, JenisKelamin, StatusPernikahan } from "@/constants/InputProps";

export default function DataPribadiForm() {
	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
				Data Pribadi Pegawai
			</Heading>
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
			<Input type='textarea' name='alamat' label='Alamat' placeholder='Masukan Alamat' shadow='md' rounded='md' rows={5} />
		</Flex>
	);
}
