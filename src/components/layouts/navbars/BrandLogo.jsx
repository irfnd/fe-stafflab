import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Text, Flex } from "@chakra-ui/react";

export default function BrandLogo({ type = "navbar", onClose = null }) {
	const navigate = useNavigate();

	return (
		<Flex
			direction='column'
			align={type === "navbar" ? { base: "start", md: "center" } : "center"}
			w='full'
			cursor='pointer'
			onClick={() => {
				if (onClose) {
					navigate("/");
					onClose();
				} else {
					navigate("/");
				}
			}}
		>
			<Flex justify='center'>
				<Text fontFamily='mono' fontSize='4xl' fontWeight='bold' lineHeight={10}>
					Staff
				</Text>
				<Text fontFamily='mono' color='cyan.500' fontSize='4xl' fontWeight='bold' lineHeight={10}>
					Lab
				</Text>
			</Flex>
			<Text fontSize={10}>Employees & Staff Management System</Text>
		</Flex>
	);
}
