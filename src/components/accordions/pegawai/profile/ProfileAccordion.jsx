// Styles & Icons
import { Accordion } from "@chakra-ui/react";

// Components
import DataDiriAccordionItem from "@/components/accordions/pegawai/profile/DataDiriAccordionItem";

export default function ProfileAccordion() {
	return (
		<Accordion allowToggle>
			<DataDiriAccordionItem />
		</Accordion>
	);
}
