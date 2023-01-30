// Styles & Icons
import { Accordion } from "@chakra-ui/react";

// Components
import DataLamaranAccordionItem from "@/components/accordions/pegawai/profile/DataLamaranAccordionItem";
import DataPribadiAccordionItem from "@/components/accordions/pegawai/profile/DataPribadiAccordionItem";
import KontakAccordionItem from "@/components/accordions/pegawai/profile/KontakAccordionItem";
import RiwayatCutiAccordionItem from "@/components/accordions/pegawai/profile/RiwayatCutiAccordionItem";
import RiwayatMutasiAccordionItem from "@/components/accordions/pegawai/profile/RiwayatMutasiAccordionItem";
import RiwayatPendidikanAccordionItem from "@/components/accordions/pegawai/profile/RiwayatPendidikanAccordionItem";

export default function ProfileAccordion() {
	return (
		<Accordion display='flex' flexDirection='column' gap={8} allowToggle>
			<KontakAccordionItem />
			<DataPribadiAccordionItem />
			<RiwayatPendidikanAccordionItem />
			<RiwayatMutasiAccordionItem />
			<RiwayatCutiAccordionItem />
			<DataLamaranAccordionItem />
		</Accordion>
	);
}
