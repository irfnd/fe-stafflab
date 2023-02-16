import useClaims from "@/helpers/hooks/useClaims";
import useDokumen from "@/helpers/hooks/useDokumen";
import useMutasi from "@/helpers/hooks/useMutasi";
import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Button, Flex } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import MutasiList from "@/components/lists/MutasiList";

export default function RiwayatMutasi() {
	const claims = useClaims();
	const navigate = useNavigate();
	useMutasi();
	useDokumen();

	return (
		<Flex direction='column' w='full' gap={8}>
			{claims && claims === "ADMIN" && (
				<Button
					size={{ base: "md", lg: "lg" }}
					colorScheme='cyan'
					w={{ base: "full", md: "fit-content" }}
					leftIcon={<Plus size={20} />}
					shadow='md'
					onClick={() => navigate("/mutasi/tambah")}
				>
					Tambah Mutasi
				</Button>
			)}
			<MutasiList withMenu={claims && claims === "ADMIN"} />
		</Flex>
	);
}
