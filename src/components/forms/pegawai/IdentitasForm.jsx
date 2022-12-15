import useInstansi from "@/helpers/hooks/useInstansi";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";
import { StatusPegawai } from "@/constants/InputProps";

export default function IdentitasForm() {
	const instansi = useInstansi()?.instansi?.map((el) => ({ value: el.id, text: el.nama }));

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
				Identitas Pegawai
			</Heading>
			<Flex direction={{ base: "column", md: "row" }} gap={6}>
				<Flex direction='column' w={{ base: "full", md: "50%", xl: "30%" }} gap={2}>
					<Input type='photo' name='foto' label='Foto Profil' file='images' h={256} />
				</Flex>
				<Flex w={{ base: "full", md: "50%", xl: "70%" }} direction='column' gap={6}>
					<Input name='nip' type='number' label='NIP' placeholder='Masukan NIP' shadow='md' rounded='md' />
					<Input name='nama' label='Nama' placeholder='Masukan Nama' shadow='md' rounded='md' />
					<Input
						type='select'
						name='status'
						label='Status'
						placeholder='Pilih Status'
						options={StatusPegawai}
						defaultValue='magang'
						shadow='md'
						rounded='md'
					/>
				</Flex>
			</Flex>
			<Input type='select' name='instansi' label='Instansi' placeholder='Masukan Instansi' options={instansi} shadow='md' rounded='md' />
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
				<Input name='divisi' label='Divisi' placeholder='Masukan Divisi' shadow='md' rounded='md' />
				<Input name='jabatan' label='Jabatan' placeholder='Masukan Jabatan' shadow='md' rounded='md' />
			</SimpleGrid>
		</Flex>
	);
}
