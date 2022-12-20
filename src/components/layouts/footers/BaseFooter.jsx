import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Flex, Text } from "@chakra-ui/react";

export default function BaseFooter() {
	const navigate = useNavigate();

	return (
		<Flex justify='center'>
			<Text fontSize={{ base: 12, sm: 14, md: 16 }}>
				&copy; {new Date().getFullYear()}{" "}
				<Text
					as='span'
					fontFamily='mono'
					fontSize={{ base: 14, sm: 16, md: 18 }}
					fontWeight='semibold'
					cursor='pointer'
					_hover={{
						textDecoration: "underline",
						textDecorationColor: "cyan.500",
						textDecorationThickness: 2,
					}}
					onClick={() => navigate("/")}
				>
					StaffLab
				</Text>
				. All Rights Reserved.
			</Text>
		</Flex>
	);
}
