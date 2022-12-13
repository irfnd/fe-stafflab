import { useState } from "react";

// Styles & Icons
import { Flex, IconButton, Button, Text, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BasePagination({ totalPages }) {
	const [Page, setPage] = useState(1);
	const leftIcon = <ChevronLeft />;
	const rightIcon = <ChevronRight />;

	const clickPrev = (prev) => (prev > 1 ? prev - 1 : prev);
	const clickNext = (prev) => (prev <= Page && prev < totalPages ? prev + 1 : prev);
	const btn = (dir) =>
		useBreakpointValue({
			base:
				dir === "left" ? (
					<BtnIcon icon={leftIcon} onClick={() => setPage(clickPrev)} disabled={Page <= 1} />
				) : (
					<BtnIcon icon={rightIcon} onClick={() => setPage(clickNext)} disabled={Page >= totalPages} />
				),
			md:
				dir === "left" ? (
					<BtnText leftIcon={leftIcon} text='Sebelumnya' onClick={() => setPage(clickPrev)} disabled={Page <= 1} />
				) : (
					<BtnText rightIcon={rightIcon} text='Selanjutnya' onClick={() => setPage(clickNext)} disabled={Page >= totalPages} />
				),
		});

	return (
		<Flex align='center' justify='space-between' w='full'>
			{btn("left")}
			<Text fontSize={{ base: 16, md: 18 }} fontWeight='semibold'>
				{Page} / {totalPages}
			</Text>
			{btn("right")}
		</Flex>
	);
}

function BtnText({ text, ...props }) {
	return (
		<Button size='lg' colorScheme='cyan' {...props}>
			{text}
		</Button>
	);
}

function BtnIcon(props) {
	return <IconButton size='lg' colorScheme='cyan' {...props} />;
}
