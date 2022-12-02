import usePageTitle from "@/helpers/hooks/usePageTitle";

// Styles & Icons
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Components
import BrandLogo from "@/components/layouts/navbars/BrandLogo";

export default function AuthLayout({ children }) {
	usePageTitle();

	return (
		<Flex w="full" justify="center" align="center" minH="100vh" bgGradient="linear(to-br, cyan.500, blue.500)" py={4}>
			<Flex
				direction="column"
				justify="center"
				align="center"
				w={{ base: "full", sm: "75%", md: "60%", lg: "40%", xl: "30%" }}
				h="full"
				p={10}
				mx={6}
				shadow="lg"
				rounded="xl"
				gap={10}
				bg={useColorModeValue("white", "gray.900")}
			>
				<BrandLogo type="auth" />
				{children}
			</Flex>
		</Flex>
	);
}
