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
			base:
				dir === "left" ? (
					<BtnIcon icon={leftIcon} onClick={() => setPage((prev) => prev - 1)} />
				) : (
					<BtnIcon icon={rightIcon} onClick={() => setPage((prev) => prev + 1)} />
				),
			md:
				dir === "left" ? (
					<BtnText leftIcon={leftIcon} text='Sebelumnya' onClick={() => setPage((prev) => prev - 1)} />
				) : (
					<BtnText rightIcon={rightIcon} text='Selanjutnya' onClick={() => setPage((prev) => prev + 1)} />
				),
		});

	return (
		<Flex align='center' justify='space-between' w='full'>
			{btn("left")}
			<Text fontSize={{ base: 16, md: 18 }} fontWeight='semibold'>
				{Page} / 10
			</Text>
			{btn("right")}
		</Flex>
	);
}

function BtnText({ text, leftIcon = null, rightIcon = null, onClick }) {
	return (
		<Button size='lg' colorScheme='cyan' leftIcon={leftIcon} rightIcon={rightIcon} onClick={onClick}>
			{text}
		</Button>
	);
}

function BtnIcon({ icon, onClick }) {
	return <IconButton size='lg' colorScheme='cyan' icon={icon} onClick={onClick} />;
}
