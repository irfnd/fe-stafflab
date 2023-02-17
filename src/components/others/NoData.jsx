// Styles & Icons
import { Flex, Image, Text } from "@chakra-ui/react";

// Components
import noData from "@/assets/no-data.svg";

export default function NoData({ page, inProfile = false }) {
	return (
		<Flex direction='column' h='full' w='full' justify='center' align='center' p={10} gap={8}>
			<Image src={noData} style={{ filter: "drop-shadow(3px 5px 5px rgb(0 0 0 / 0.3))" }} maxH={inProfile ? 150 : 300} h='full' />
			<Text fontSize={inProfile ? "lg" : { base: "md", lg: "lg", xl: "xl" }} fontWeight='bold' align='center'>
				Data {page} Belum Tersedia!
			</Text>
		</Flex>
	);
}
