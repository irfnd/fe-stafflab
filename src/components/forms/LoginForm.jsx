import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/helpers/Validations";

// Styles & Icons
import { Flex, Button } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function LoginForm() {
	const resolver = yupResolver(LoginSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });

	const onLogin = (data) => console.log(data);

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onLogin)} style={{ width: "100%" }}>
				<Flex direction='column' w='full' gap={4}>
					<Input type='email' name='email' label='Email' placeholder='Masukan Email' />
					<Input type='password' name='password' label='Password' placeholder='Masukan Password' />
					<Button type='submit' colorScheme='cyan' size='lg' mt={4}>
						Login
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
}
