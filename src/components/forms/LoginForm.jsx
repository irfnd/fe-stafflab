// Styles & Icons
import { Flex, Button } from "@chakra-ui/react";

// Components
import Input from "@/components/inputs/Input";

export default function LoginForm() {
	return (
		<Flex direction='column' w='full' gap={4}>
			<Input label='Email' placeholder='Masukan Email' />
			<Input type='password' label='Password' placeholder='Masukan Password' />
			<Button colorScheme='cyan' size='lg' mt={4}>
				Login
			</Button>
		</Flex>
	);
}
