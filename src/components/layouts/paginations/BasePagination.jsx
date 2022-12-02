import { useState } from "react";

// Styles & Icons
import { Flex, IconButton, Button, Text, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BasePagination() {
	const [Page, setPage] = useState(1);

	const leftIcon = <ChevronLeft />;
	const rightIcon = <ChevronRight />;
	const btn = (dir) =>
		useBreakpointValue({
			base: dir === "left" ? <BtnIcon icon={leftIcon} /> : <BtnIcon icon={rightIcon} />,
			md: dir === "left" ? <BtnText leftIcon={leftIcon} text="Sebelumnya" /> : <BtnText rightIcon={rightIcon} text="Selanjutnya" />,
		});

	return (
		<Flex align="center" justify="space-between" w="full">
			{btn("left")}
			<Text>{Page} / 10</Text>
			{btn("right")}
		</Flex>
	);
}

function BtnText({ text, leftIcon = null, rightIcon = null }) {
	return (
		<Button size="lg" colorScheme="cyan" leftIcon={leftIcon} rightIcon={rightIcon}>
			{text}
		</Button>
	);
}

function BtnIcon({ icon }) {
	return <IconButton size="lg" colorScheme="cyan" icon={icon} />;
}
