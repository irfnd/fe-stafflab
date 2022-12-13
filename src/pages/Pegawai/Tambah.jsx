import { FormProvider, useForm } from "react-hook-form";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import TambahForm from "@/components/forms/pegawai/TambahForm";

export default function Tambah() {
	const mainForm = useForm();

	const onSubmit = (data) => console.log(data);

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onSubmit)}>
				<Flex direction='column' w='full' gap={8}>
					<TambahForm />
				</Flex>
			</form>
		</FormProvider>
	);
}
