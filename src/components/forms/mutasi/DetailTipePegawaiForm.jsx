import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function DetailTipePegawaiForm() {
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);

	const { watch } = useFormContext();

	return (
		watch("jenisMutasi") === "Pengangkatan" && (
			<Flex direction={{ base: "column", md: "row" }} align='center' gap={{ base: 6, md: 2 }}>
				<Input
					type='select'
					name='fromTipe'
					label='Tipe Pegawai'
					placeholder='Pilih Tipe Pegawai'
					options={tipePegawai?.map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
					disabled
				/>
				<IconButton
					icon={<ArrowRight />}
					size='lg'
					variant='ghost'
					colorScheme='cyan'
					mt={{ base: 0, md: 8 }}
					disabled
					display={{ base: "none", md: "flex" }}
				/>
				<Input
					type='select'
					name='toTipe'
					label='Tipe Pegawai'
					placeholder='Pilih Tipe Pegawai'
					options={tipePegawai?.filter((el) => el.nama === "Tetap").map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
			</Flex>
		)
	);
}
