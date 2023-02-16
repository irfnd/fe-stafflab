import useDokumen from "@/helpers/hooks/useDokumen";
import usePegawaiById from "@/helpers/hooks/usePegawaiById";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import MutasiForm from "@/components/forms/mutasi/MutasiForm";

export default function PilihMutasiPegawai() {
	const params = useParams();
	usePegawaiById(params?.id);
	useDokumen(params?.id);

	return (
		<Flex direction='column' w='full' gap={8}>
			<Flex direction='column' w='full' gap={8}>
				<MutasiForm />
			</Flex>
		</Flex>
	);
}
