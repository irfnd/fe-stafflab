// Styles & Icons
import {
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	useColorModeValue,
} from "@chakra-ui/react";
import { Filter, Search } from "lucide-react";

export default function SearchForm() {
	const bgSearch = useColorModeValue("white", "gray.800");

	return (
		<Flex w="full" gap={{ base: 2, md: 4 }}>
			<InputGroup size="lg" bg={bgSearch} shadow="md" rounded="md">
				<InputLeftElement>
					<Search />
				</InputLeftElement>
				<Input type="text" placeholder="Cari Pegawai" focusBorderColor="cyan.500" />
			</InputGroup>
			<Menu>
				<MenuButton as={IconButton} icon={<Filter />} size="lg" colorScheme="cyan" shadow="md" />
				<MenuList shadow="lg">
					<MenuOptionGroup title="Filter Pegawai" type="radio" defaultValue="name">
						<MenuItemOption value="name">Nama</MenuItemOption>
						<MenuItemOption value="nip">NIP</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup title="Urutkan Pegawai" type="radio" defaultValue="status">
						<MenuItemOption value="status">Status</MenuItemOption>
						<MenuItemOption value="position">Posisi</MenuItemOption>
						<MenuItemOption value="division">Divisi</MenuItemOption>
						<MenuItemOption value="updatedAt">Diubah</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup title="Urutan Pegawai" type="radio" defaultValue="asc">
						<MenuItemOption value="asc">Naik (A-Z)</MenuItemOption>
						<MenuItemOption value="desc">Menurun (Z-A)</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</Flex>
	);
}
