import useQueryParams from "@/helpers/hooks/useQueryParams";
import { createSearchParams } from "react-router-dom";

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
	const { queryParams, setQueryParams } = useQueryParams();

	const bgSearch = useColorModeValue("white", "gray.800");

	const onChangeSearch = (e) => {
		setQueryParams(createSearchParams({ ...queryParams, search: e.target.value }));
	};
	const onChangeMenu = (value, key) => setQueryParams(createSearchParams({ ...queryParams, [key]: value }));

	return (
		<Flex w='full' gap={{ base: 2, md: 4 }}>
			<InputGroup size='lg' bg={bgSearch} shadow='md' rounded='md'>
				<InputLeftElement>
					<Search />
				</InputLeftElement>
				<Input
					type='text'
					placeholder={`Cari ${queryParams.filter === "nip" ? "NIP" : "Nama"} Pegawai`}
					defaultValue={queryParams.search}
					onChange={(e) => onChangeSearch(e)}
					focusBorderColor='cyan.500'
				/>
			</InputGroup>
			<Menu>
				<MenuButton as={IconButton} icon={<Filter />} size='lg' colorScheme='cyan' shadow='md' />
				<MenuList shadow='lg'>
					<MenuOptionGroup
						title='Filter Pegawai'
						type='radio'
						defaultValue={queryParams.filter}
						onChange={(value) => onChangeMenu(value, "filter")}
					>
						<MenuItemOption value='nip'>NIP</MenuItemOption>
						<MenuItemOption value='nama'>Nama</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup
						title='Urutkan Pegawai'
						type='radio'
						defaultValue={queryParams.order}
						onChange={(value) => onChangeMenu(value, "order")}
					>
						<MenuItemOption value='nama'>Nama</MenuItemOption>
						<MenuItemOption value='idInstansi'>Instansi</MenuItemOption>
						<MenuItemOption value='idDivisi'>Divisi</MenuItemOption>
						<MenuItemOption value='idGolongan'>Golongan</MenuItemOption>
						<MenuItemOption value='createdAt'>Diubah</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup
						title='Urutan Pegawai'
						type='radio'
						defaultValue={queryParams.sort}
						onChange={(value) => onChangeMenu(value, "sort")}
					>
						<MenuItemOption value='asc'>Naik (A-Z)</MenuItemOption>
						<MenuItemOption value='desc'>Menurun (Z-A)</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</Flex>
	);
}
