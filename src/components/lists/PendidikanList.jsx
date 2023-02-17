import { PendidikanSelector } from "@/helpers/redux/slices/PendidikanSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { Button, Flex, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";

// Components
import PendidikanCard from "@/components/cards/PendidikanCard";
import PendidikanModal from "@/components/modals/pendidikan/PendidikanModal";
import NoData from "@/components/others/NoData";

export default function PendidikanList() {
	const pendidikan = useSelector(PendidikanSelector.selectAll);

	const disclosureAdd = useDisclosure();

	return (
		<Flex direction='column' gap={6}>
			<Flex
				direction={{ base: "column", md: "row" }}
				align={{ base: "flex-start", md: "center" }}
				justify={{ md: "space-between" }}
				gap={6}
			>
				<Heading fontSize={{ base: "lg", md: "xl" }}>Data Berkaitan</Heading>
				<Button
					variant='outline'
					colorScheme='cyan'
					size='sm'
					leftIcon={<Plus size={18} />}
					w={{ base: "full", md: "fit-content" }}
					onClick={disclosureAdd.onOpen}
				>
					Tambah
				</Button>
			</Flex>
			{pendidikan?.length > 0 ? (
				<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
					{pendidikan.map((el, i) => (
						<PendidikanCard key={i} pendidikan={el} />
					))}
				</SimpleGrid>
			) : (
				<NoData page='Riwayat Pendidikan' inProfile />
			)}
			<PendidikanModal disclosure={disclosureAdd} />
		</Flex>
	);
}
