import usePegawaiById from "@/helpers/hooks/usePegawaiById";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Text } from "@chakra-ui/react";

// Components

export default function MutasiPegawai() {
	const params = useParams();
	usePegawaiById(params?.id);

	return (
		<Flex direction='column' w='full' gap={8}>
			<Flex direction='column' w='full' gap={8}>
				<Text>Mutasi Pegawai</Text>
			</Flex>
		</Flex>
	);
}
