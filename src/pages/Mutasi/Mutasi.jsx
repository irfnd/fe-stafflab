import { useNavigate } from "react-router-dom";
import useMutasi from "@/helpers/hooks/useMutasi";
import useDokumen from "@/helpers/hooks/useDokumen";

// Styles & Icons
import { Button, Flex } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import MutasiList from "@/components/lists/MutasiList";

export default function Mutasi() {
	const navigate = useNavigate();
	useMutasi();
	useDokumen();

	return (
		<Flex direction='column' w='full' gap={8}>
			<Button
				colorScheme='cyan'
				w={{ base: "full", md: "fit-content" }}
				leftIcon={<Plus size={20} />}
				shadow='md'
				onClick={() => navigate("/mutasi/tambah")}
			>
				Tambah Mutasi
			</Button>
			<MutasiList />
		</Flex>
	);
}
