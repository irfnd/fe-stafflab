// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function AkunResetPasswordForm() {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input type='password' name='password' label='Password Baru' placeholder='Masukan Password Baru' shadow='md' rounded='md' />
			<Input
				type='password'
				name='confirm'
				label='Konfirmasi Password Baru'
				placeholder='Konfirmasi Password Baru'
				shadow='md'
				rounded='md'
			/>
		</Flex>
	);
}
