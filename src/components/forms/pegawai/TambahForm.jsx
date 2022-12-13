import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PegawaiSchema } from "@/helpers/Validations";

// Styles & Icons
import { Button, Flex } from "@chakra-ui/react";

// Components
import DataDiriForm from "@/components/forms/pegawai/DataDiriForm";
import DokumenLamaranForm from "@/components/forms/pegawai/DokumenLamaranForm";
import IdentitasForm from "@/components/forms/pegawai/IdentitasForm";
import KontakForm from "@/components/forms/pegawai/KontakForm";

export default function TambahForm() {
	const resolver = yupResolver(PegawaiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });

	const onSubmit = (data) => console.log(data);

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onSubmit)}>
				<Flex direction='column' w='full' gap={8}>
					<IdentitasForm />
					<DataDiriForm />
					<KontakForm />
					<DokumenLamaranForm />
					<Flex justify='flex-end'>
						<Button type='submit' colorScheme='cyan' size='lg' w={{ base: "full", md: "fit-content" }}>
							Simpan Pegawai
						</Button>
					</Flex>
				</Flex>
			</form>
		</FormProvider>
	);
}
