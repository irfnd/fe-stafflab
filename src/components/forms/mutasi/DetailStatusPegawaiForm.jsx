import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function DetailStatusPegawaiForm() {
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);

	const { watch } = useFormContext();

	return (
		["Pensiun", "PHK"].includes(watch("jenisMutasi")) && (
			<Flex direction={{ base: "column", md: "row" }} align='center' gap={{ base: 6, md: 2 }}>
				<Input
					type='select'
					name='fromStatus'
					label='Status Pegawai'
					placeholder='Pilih Status Pegawai'
					options={statusPegawai?.filter((el) => el.nama !== "Cuti")?.map((el) => ({ value: el.id, text: el.nama }))}
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
					name='toStatus'
					label='Status Pegawai'
					placeholder='Pilih Status Pegawai'
					options={statusPegawai?.filter((el) => el.nama === watch("jenisMutasi"))?.map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
			</Flex>
		)
	);
}
