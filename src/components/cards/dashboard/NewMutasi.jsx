import { Link as RouterLink } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components
import MutasiBaruTable from "@/components/tables/MutasiBaruTable";

export default function NewMutasi() {
	return (
		<Flex direction='column' gap={6}>
			<Flex align='center' justify='space-between'>
				<Heading fontSize={{ base: "xl", md: "2xl" }}>Mutasi Terbaru</Heading>
				<Link as={RouterLink} to='/mutasi/list' color='cyan.500'>
					<Flex align='center' gap={1}>
						<Text>Selengkapnya</Text>
						<Icon as={ChevronRight} fontSize={20} />
					</Flex>
				</Link>
			</Flex>
			<MutasiBaruTable />
		</Flex>
	);
}
