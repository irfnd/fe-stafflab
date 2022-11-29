// Styles & Icons
import { Text, Flex } from "@chakra-ui/react";

export default function BrandLogo() {
	return (
		<Flex direction="column" align={{ base: "start", md: "center" }} w="full" cursor="pointer">
			<Flex justify="center">
				<Text fontFamily="mono" fontSize="4xl" fontWeight="bold" lineHeight={10}>
					Staff
				</Text>
				<Text fontFamily="mono" color="brand.blue.500" fontSize="4xl" fontWeight="bold" lineHeight={10}>
					Lab
				</Text>
			</Flex>
			<Text fontSize={10}>Employees & Staff Management System</Text>
		</Flex>
	);
}
