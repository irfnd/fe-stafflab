import useClaims from "@/helpers/hooks/useClaims";
import useDokumen from "@/helpers/hooks/useDokumen";
import useJabatan from "@/helpers/hooks/useJabatan";
import useManajer from "@/helpers/hooks/useManajer";
import useMutasi from "@/helpers/hooks/useMutasi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Button, Flex } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import MutasiList from "@/components/lists/MutasiList";

export default function RiwayatMutasi() {
	const { session } = useSelector((state) => state.auth);
	const claims = useClaims();
	const navigate = useNavigate();

	const manajer = useManajer(session?.user?.id);
	useMutasi({ divisi: manajer?.idDivisi });
	useDokumen();
	useJabatan();

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
