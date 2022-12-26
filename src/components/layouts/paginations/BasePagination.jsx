import useQueryParams from "@/helpers/hooks/useQueryParams";
import { createSearchParams } from "react-router-dom";

// Styles & Icons
import { Button, Flex, IconButton, Skeleton, Text, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BasePagination({ page, totalPages }) {
	const { queryParams, setQueryParams } = useQueryParams();

	const leftIcon = <ChevronLeft />;
	const rightIcon = <ChevronRight />;

	const clickPrev = () => {
		const prevPage = page > 1 ? page - 1 : page;
		setQueryParams(createSearchParams({ ...queryParams, page: prevPage }));
	};

	const clickNext = () => {
		const nextPage = page >= totalPages ? page : page + 1;
		setQueryParams(createSearchParams({ ...queryParams, page: nextPage }));
	};

	const btn = (dir) =>
		useBreakpointValue({
			base:
				dir === "left" ? (
					<Skeleton isLoaded={page && totalPages} rounded='md'>
						<BtnIcon icon={leftIcon} onClick={clickPrev} disabled={page <= 1} />
					</Skeleton>
				) : (
					<Skeleton isLoaded={page && totalPages} rounded='md'>
						<BtnIcon icon={rightIcon} onClick={clickNext} disabled={page >= totalPages} />
					</Skeleton>
				),
			md:
				dir === "left" ? (
					<Skeleton isLoaded={page && totalPages} rounded='md'>
						<BtnText leftIcon={leftIcon} text='Sebelumnya' onClick={clickPrev} disabled={page <= 1} />
					</Skeleton>
				) : (
					<Skeleton isLoaded={page && totalPages} rounded='md'>
						<BtnText rightIcon={rightIcon} text='Selanjutnya' onClick={clickNext} disabled={page >= totalPages} />
					</Skeleton>
				),
		});

	return (
		<Flex align='center' justify='space-between' w='full'>
			{btn("left")}
			<Skeleton isLoaded={page && totalPages} w={page && totalPages ? "auto" : 10} rounded='md'>
				<Text fontSize={{ base: 16, md: 18 }} fontWeight='semibold'>
					{page} / {totalPages}
				</Text>
			</Skeleton>
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
