import useQueryParams from "@/helpers/hooks/useQueryParams";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useSelector } from "react-redux";
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
import { Filter, Search, UserCheck } from "lucide-react";

export default function SearchPegawaiForm() {
	const { queryParams, setQueryParams } = useQueryParams();
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);

	const bgSearch = useColorModeValue("white", "gray.800");

	const onChangeSearch = (e) => setQueryParams(createSearchParams({ ...queryParams, search: e.target.value }));
	const onChangeMenu = (value, key) => {
		if (key === "filter") {
			const { search, ...selectedParams } = queryParams;
			setQueryParams(createSearchParams({ ...selectedParams, [key]: value }));
		} else {
			setQueryParams(createSearchParams({ ...queryParams, [key]: value }));
		}
	};

	return (
		<Flex w='full' gap={2}>
			<InputGroup size='lg' bg={bgSearch} shadow='md' rounded='md'>
				<InputLeftElement>
					<Search />
				</InputLeftElement>
				<Input
					type='text'
					placeholder={`Cari ${queryParams.filter === "nip" ? "NIP" : "Nama"} Pegawai`}
					value={`${queryParams?.search || ""}`}
					onChange={(e) => onChangeSearch(e)}
					focusBorderColor='cyan.500'
				/>
			</InputGroup>

			<Menu>
				<MenuButton as={IconButton} icon={<UserCheck />} size='lg' colorScheme='cyan' shadow='md' />
				<MenuList shadow='lg'>
					<MenuOptionGroup
						title='Status Pegawai'
						type='radio'
						value={`${queryParams?.status || ""}`}
						onChange={(value) => onChangeMenu(value, "status")}
					>
						<MenuItemOption value=''>Semua</MenuItemOption>
						{statusPegawai?.map((el) => (
							<MenuItemOption key={el.id} value={`${el.id}`}>
								{el.nama}
							</MenuItemOption>
						))}
					</MenuOptionGroup>
				</MenuList>
			</Menu>

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
						<MenuItemOption value='idStatus'>Status</MenuItemOption>
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
