import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";

// Components
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";

export default function KontakSection() {
	const [formDisabled, setFormDisabled] = useState(true);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const mainForm = useForm({ mode: "onChange" });

	useEffect(() => {
		mainForm.reset({ email: pegawai?.email, noTelepon: pegawai?.noTelepon?.replace("+62", "") });
	}, [pegawai]);

	return (
		<FormProvider {...mainForm}>
			<Flex direction={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} justify={{ md: "space-between" }} gap={6}>
				<Heading fontSize={{ base: "lg", md: "xl" }}>Data Berkaitan</Heading>
				<EditButtonSection formHandler={{ formDisabled, setFormDisabled }} />
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
				<Input name='email' type='email' label='Email' placeholder='Masukan Email' shadow='md' rounded='md' disabled={formDisabled} />
				<Input
					name='noTelepon'
					type='number'
					label='Nomor Telepon'
					placeholder='Masukan Nomor Telepon'
					leftAddon='+62'
					shadow='md'
					rounded='md'
					disabled={formDisabled}
				/>
			</SimpleGrid>
		</FormProvider>
	);
}
