// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function KontakForm() {
	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
			<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
				Kontak Pegawai
			</Heading>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
				<Input name='email' type='email' label='Email' placeholder='Masukan Email' shadow='md' rounded='md' />
				<Input
					name='noTelepon'
					type='number'
					label='Nomor Telepon'
					placeholder='Masukan Nomor Telepon'
					leftAddon='+62'
					shadow='md'
					rounded='md'
				/>
			</SimpleGrid>
		</Flex>
	);
}
