// Styles & Icons
import { Card, CardBody, CardHeader, Text, Icon, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FileDigit, FileType2, FileClock, FileBadge } from "lucide-react";

// Components
import FileCardMenu from "@/components/menus/FileCardMenu";

export default function FileCard({ file }) {
	const disclosureUpdate = useDisclosure();
	const disclosureDelete = useDisclosure();

	const borderFileCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	return (
		<Card bg='transparent' display='flex' flexDir='column' p={4} gap={4} border='1px solid' borderColor={borderFileCard}>
			<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
				<Text fontSize='lg' fontWeight='semibold'>
					Filename
				</Text>
				<FileCardMenu disclosure={{ disclosureUpdate, disclosureDelete }} />
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={2}>
				<Flex align='center' gap={2}>
					<Icon as={FileBadge} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' color={fontFileColor}>
						File Category
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={FileDigit} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' color={fontFileColor}>
						Filesize
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={FileType2} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' color={fontFileColor}>
						Filetype
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={FileClock} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' color={fontFileColor}>
						Uploaded At
					</Text>
				</Flex>
			</CardBody>
		</Card>
	);
}
