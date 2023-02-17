import { useNavigate } from "react-router-dom";
import { useTitle } from "react-use";

// Styles & Icons
import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";

// Components
import notFound from "@/assets/not-found.svg";

export default function NotFound() {
	const navigate = useNavigate();
	useTitle("StaffLab - Not Found");

	return (
		<Flex direction='column' h='100vh' w='full' justify='center' align='center' p={10} gap={6}>
			<Image src={notFound} style={{ filter: "drop-shadow(3px 5px 5px rgb(0 0 0 / 0.3))" }} h='auto' />
			<Text fontSize={{ base: "md", lg: "lg", xl: "xl" }} fontWeight='bold' align='center'>
				Maaf, Halaman tidak ditemukan!
			</Text>
			<Button
				size={{ base: "md", md: "lg" }}
				w={{ base: "full", sm: "fit-content" }}
				colorScheme='cyan'
				leftIcon={<Icon as={ArrowLeft} fontSize={22} />}
				onClick={() => navigate(-1)}
			>
				Kembali
			</Button>
		</Flex>
	);
}
