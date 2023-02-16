import useClaims from "@/helpers/hooks/useClaims";
import { Link as RouterLink } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

// Components
import PegawaiBaruTable from "@/components/tables/PegawaiBaruTable";

export default function NewPegawai() {
	const claims = useClaims();

	return (
		<Flex direction='column' gap={6}>
			<Flex align='center' justify='space-between'>
				<Heading fontSize={{ base: "xl", md: "2xl" }}>Pegawai Terbaru</Heading>
				{claims && claims === "ADMIN" && (
					<Link as={RouterLink} to='/pegawai' color='cyan.500'>
						<Flex align='center' gap={1}>
							<Text>Selengkapnya</Text>
							<Icon as={ChevronRight} fontSize={20} />
						</Flex>
					</Link>
				)}
			</Flex>
			<PegawaiBaruTable />
		</Flex>
	);
}
