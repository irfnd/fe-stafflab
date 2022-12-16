// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components
import IdentitasSection from "@/components/forms/pegawai/profile/IdentitasSection";
import ProfileAccordion from "@/components/accordions/pegawai/profile/ProfileAccordion";

export default function ProfilePegawai() {
	return (
		<Flex direction='column' w='full' gap={8}>
			<Flex direction='column' w='full' gap={8}>
				<IdentitasSection />
				<ProfileAccordion />
			</Flex>
		</Flex>
	);
}
