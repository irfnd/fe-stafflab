import useCuti from "@/helpers/hooks/useCuti";
import useDataPribadi from "@/helpers/hooks/useDataPribadi";
import useDokumen from "@/helpers/hooks/useDokumen";
import useMutasi from "@/helpers/hooks/useMutasi";
import usePegawaiById from "@/helpers/hooks/usePegawaiById";
import usePendidikan from "@/helpers/hooks/usePendidikan";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

// Components
import ProfileAccordion from "@/components/accordions/pegawai/profile/ProfileAccordion";
import IdentitasSection from "@/components/forms/pegawai/profile/IdentitasSection";
import PegawaiDeleteModal from "@/components/modals/PegawaiDeleteModal";

export default function ProfilePegawai() {
	const disclosureDelete = useDisclosure();
	const params = useParams();
	const { pegawai } = usePegawaiById(params?.id);

	useDataPribadi(params?.id);
	useDokumen(params?.id);
	usePendidikan(params?.id);
	useMutasi({ nip: params?.id, diterima: true });
	useCuti(params?.id);

	return (
		<Flex direction='column' w='full' gap={8}>
			<Flex direction='column' w='full' gap={8}>
				<IdentitasSection />
				<ProfileAccordion />
				<Flex w='full' justify='flex-end'>
					<Button
						colorScheme='red'
						size={{ base: "md", lg: "lg" }}
						w={{ base: "full", md: "fit-content" }}
						leftIcon={<Trash2 size={20} />}
						shadow='md'
						onClick={disclosureDelete.onOpen}
					>
						Hapus Pegawai
					</Button>
					<PegawaiDeleteModal disclosure={disclosureDelete} pegawai={pegawai} />
				</Flex>
			</Flex>
		</Flex>
	);
}
