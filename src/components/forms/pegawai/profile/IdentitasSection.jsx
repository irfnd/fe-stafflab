import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useColorModeValue, Button } from "@chakra-ui/react";
import { Edit } from "lucide-react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function IdentitasSection() {
	const [formDisabled, setFormDisabled] = useState(true);
	const mainForm = useForm({ mode: "onChange" });

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<FormProvider {...mainForm}>
			<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
				<Flex align='center' justify='space-between'>
					<Heading textAlign={{ base: "center", md: "left" }} fontSize='2xl'>
						Identitas Pegawai
					</Heading>
					<Button variant='outline' colorScheme='cyan' size='sm' leftIcon={<Edit size={18} />}>
						Edit
					</Button>
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
							options={[]}
							shadow='md'
							rounded='md'
							disabled={formDisabled}
						/>
					</Flex>
				</Flex>
				<Input
					type='select'
					name='instansi'
					label='Instansi'
					placeholder='Pilih Instansi'
					options={[]}
					shadow='md'
					rounded='md'
					disabled={formDisabled}
				/>
				<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
					<Input
						type='select'
						name='divisi'
						label='Divisi'
						placeholder='Pilih Divisi'
						options={[]}
						shadow='md'
						rounded='md'
						disabled={formDisabled}
					/>
					<Input
						type='select'
						name='jabatan'
						label='Jabatan'
						placeholder='Pilih Jabatan'
						options={[]}
						shadow='md'
						rounded='md'
						disabled={formDisabled}
					/>
				</SimpleGrid>
			</Flex>
		</FormProvider>
	);
}
