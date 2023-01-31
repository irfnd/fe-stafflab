import { Link as RouterLink } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components
import CutiBaruTable from "@/components/tables/CutiBaruTable";

export default function NewCuti() {
	return (
		<Flex direction='column' gap={6}>
			<Flex align='center' justify='space-between'>
				<Heading fontSize={{ base: "xl", md: "2xl" }}>Cuti Terbaru</Heading>
				<Link as={RouterLink} to='/cuti/list' color='cyan.500'>
					<Flex align='center' gap={1}>
						<Text>Selengkapnya</Text>
						<Icon as={ChevronRight} fontSize={20} />
					</Flex>
				</Link>
			</Flex>
			<CutiBaruTable />
		</Flex>
	);
}
