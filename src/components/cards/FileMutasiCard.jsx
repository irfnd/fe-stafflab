import useDate from "@/helpers/hooks/useDate";

// Styles & Icons
import { Card, CardBody, CardHeader, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { FileBadge, FileClock } from "lucide-react";

// Components
import FileMutasiMenu from "@/components/menus/FileMutasiMenu";

export default function FileMutasiCard({ file, form }) {
	const borderFileCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	return (
		<Card bg='transparent' display='flex' flexDir='column' p={4} gap={4} border='1px solid' borderColor={borderFileCard}>
			<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
				<Text fontSize='lg' fontWeight='semibold' noOfLines={1}>
					{file?.nama}
				</Text>
				<FileMutasiMenu file={file} form={form} />
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={2}>
				<Flex align='center' gap={2}>
					<Icon as={FileBadge} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						File {file?.kategori}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={FileClock} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' color={fontFileColor}>
						{useDate(file?.uploadedAt)}
					</Text>
				</Flex>
			</CardBody>
		</Card>
	);
}
