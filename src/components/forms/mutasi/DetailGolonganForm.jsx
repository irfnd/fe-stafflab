import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function DetailGolonganForm() {
	const golongan = useSelector(GolonganSelector.selectAll);

	const { watch } = useFormContext();

	return (
		watch("jenisMutasi") === "Golongan" && (
			<Flex direction={{ base: "column", md: "row" }} align='center' gap={{ base: 6, md: 2 }}>
				<Input
					type='select'
					name='fromGolongan'
					label='Golongan'
					placeholder='Pilih Golongan'
					options={golongan?.map((el) => ({ value: el.id, text: el.nama }))}
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
					name='toGolongan'
					label='Golongan'
					placeholder='Pilih Golongan'
					options={golongan?.filter((el) => el.id !== parseInt(watch("fromGolongan"), 10)).map((el) => ({ value: el.id, text: el.nama }))}
					shadow='md'
					rounded='md'
				/>
			</Flex>
		)
	);
}
