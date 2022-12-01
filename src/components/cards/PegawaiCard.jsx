// Styles & Icons
import { Flex, Text, Image, useColorModeValue } from "@chakra-ui/react";

const IMAGE =
	"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80";

export default function PegawaiCard({ pegawai }) {
	const bgCard = useColorModeValue("white", "gray.800");

	return (
		<Flex bg={bgCard} direction="column" shadow="lg" rounded="md" h="fit-content">
			<Flex h="200px">
				<Image src={IMAGE} boxSize="full" roundedTop="xl" fit="cover" />
			</Flex>
			<Flex direction="column" justify="center" p={6} gap={4} h="full">
				<Text fontSize={24} fontWeight="semibold" noOfLines={1}>
					{pegawai?.name} Name
				</Text>
				<Flex direction="column" gap={2}>
					<Flex align="center" gap={2}>
						{/* <Icon as={PackageMinus} fontSize={22} color="purple.500" /> */}
						<Text fontSize={16} noOfLines={1}>
							{pegawai?.purchase} NIP
						</Text>
					</Flex>
					<Flex align="center" gap={2}>
						{/* <Icon as={PackagePlus} fontSize={22} color="purple.500" /> */}
						<Text fontSize={16} noOfLines={1}>
							{pegawai?.selling} Status
						</Text>
					</Flex>
					<Flex align="center" gap={2}>
						{/* <Icon as={PackageSearch} fontSize={22} color="purple.500" /> */}
						<Text fontSize={16} noOfLines={1}>
							{pegawai?.stock} Pieces
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
