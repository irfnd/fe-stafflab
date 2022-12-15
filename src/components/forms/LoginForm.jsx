import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/helpers/Validations";
import { useNavigate } from "react-router-dom";
import Supabase from "@/helpers/Supabase";

// Styles & Icons
import { Flex, Button, useToast } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);

	const resolver = yupResolver(LoginSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const navigate = useNavigate();
	const toast = useToast();

	const onLogin = async ({ email, password }) => {
		clearInterval();
		setLoading(true);
		const { error } = await Supabase.auth.signInWithPassword({ email, password });
		if (error) {
			setLoading(false);
			toast({
				title: "Login Gagal.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: "Login Berhasil.",
				description: "Anda dapat mengakses sistem sekarang!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setTimeout(() => {
				navigate("/");
			}, 2000);
		}
	};

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onLogin)} style={{ width: "100%" }}>
				<Flex direction='column' w='full' gap={4}>
					<Input type='email' name='email' label='Email' placeholder='Masukan Email' />
					<Input type='password' name='password' label='Password' placeholder='Masukan Password' />
					<Button isLoading={loading} type='submit' colorScheme='cyan' size='lg' mt={4}>
						Login
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
}
