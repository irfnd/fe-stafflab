// Styles & Icons
import { Accordion } from "@chakra-ui/react";

// Components
import DataPribadiAccordionItem from "@/components/accordions/pegawai/profile/DataPribadiAccordionItem";

export default function ProfileAccordion() {
	return (
		<Accordion allowToggle>
			<DataPribadiAccordionItem />
		</Accordion>
	);
}
