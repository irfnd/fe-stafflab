import useDataPribadi from "@/helpers/hooks/useDataPribadi";
import useDokumen from "@/helpers/hooks/useDokumen";
import usePegawaiById from "@/helpers/hooks/usePegawaiById";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import ProfileAccordion from "@/components/accordions/pegawai/profile/ProfileAccordion";
import IdentitasSection from "@/components/forms/pegawai/profile/IdentitasSection";

export default function ProfilePegawai() {
	const params = useParams();
	usePegawaiById(params?.id);
	useDataPribadi(params?.id);
	useDokumen(params?.id);

	return (
		<Flex direction='column' w='full' gap={8}>
			<Flex direction='column' w='full' gap={8}>
				<IdentitasSection />
				<ProfileAccordion />
			</Flex>
		</Flex>
	);
}
