// Styles & Icons
import { Flex, Image, Spinner } from "@chakra-ui/react";

// Components
import Logo from "@/assets/logo.svg";

export default function Loading() {
	return (
		<Flex h='100vh' justify='center' align='center'>
			<Flex position='relative' justify='center' align='center'>
				<Image position='absolute' src={Logo} boxSize='60px' />
				<Spinner variant='loading' size='loading' color='cyan.500' speed='0.8s' />
			</Flex>
		</Flex>
	);
}
