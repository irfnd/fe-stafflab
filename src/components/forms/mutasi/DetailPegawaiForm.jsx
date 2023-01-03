import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";
import { JenisMutasi } from "@/constants/InputProps";

export default function DetailPegawaiForm() {
	const dokumen = useSelector(DokumenSelector.selectAll);
	const fotoProfil = dokumen?.filter((el) => el.kategori === "profil")[0];

	return (
		<Flex direction={{ base: "column", md: "row" }} gap={6}>
			<Flex direction='column' w={{ base: "full", md: "50%", xl: "30%" }} gap={{ base: 6, md: 2 }}>
				<Input type='photo' name='foto' label='Foto Profil' file='images' h={256} value={fotoProfil?.detail?.publicUrl} disabled />
			</Flex>
			<Flex w={{ base: "full", md: "50%", xl: "70%" }} direction='column' gap={6}>
				<Input name='nip' type='number' label='NIP Pegawai' placeholder='Masukan NIP Pegawai' shadow='md' rounded='md' disabled />
				<Input name='nama' label='Nama Pegawai' placeholder='Masukan Nama Pegawai' shadow='md' rounded='md' disabled />
				<Input type='select' name='jenisMutasi' label='Jenis Mutasi' placeholder='Pilih Jenis Mutasi' options={JenisMutasi} />
			</Flex>
		</Flex>
	);
}
