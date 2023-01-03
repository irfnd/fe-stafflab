import { useFormContext } from "react-hook-form";

// Styles & Icons
import { Text } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function DetailTanggalForm() {
	const { watch } = useFormContext();

	return (
		<>
			{watch("jenisMutasi") && (
				<Input type='date' name='tanggalMutasi' label='Tanggal Mutasi' placeholder='Masukan Tanggal Mutasi' shadow='md' rounded='md' />
			)}
			{!watch("jenisMutasi") && <Text align='center'>Harap pilih jenis mutasi, untuk menampilkan rincian mutasi pegawai!</Text>}
		</>
	);
}
