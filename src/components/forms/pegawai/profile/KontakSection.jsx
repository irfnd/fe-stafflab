import { KontakSchema } from "@/helpers/Validations";
import { updatePegawai } from "@/helpers/api/databases/pegawaiTable";
import { updateUser } from "@/helpers/api/functions/users";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, SimpleGrid, useToast } from "@chakra-ui/react";

// Components
import EditButtonSection from "@/components/forms/pegawai/profile/EditButtonSection";
import Input from "@/components/inputs/Input";

export default function KontakSection() {
	const [formDisabled, setFormDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const resolver = yupResolver(KontakSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	const onSubmit = async ({ email, noTelepon }) => {
		setLoading(true);
		try {
			const akun = await updateUser({ email, phone: `+62${noTelepon}` }, pegawai?.uuidUser);
			await updatePegawai({ email: akun.email, noTelepon: `+${akun.phone}` }, pegawai?.nip);
			setLoading(false);
			toast({
				title: "Berhasil Memperbarui Kontak Pegawai.",
				description: "Kontak telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setFormDisabled(true);
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Memperbarui Kontak Pegawai.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
			setFormDisabled(true);
		}
	};

	useEffect(() => {
		mainForm.reset({ email: pegawai?.email, noTelepon: pegawai?.noTelepon?.replace("+62", "") });
	}, [pegawai, formDisabled]);

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
				<Flex
					direction={{ base: "column", md: "row" }}
					align={{ base: "flex-start", md: "center" }}
					justify={{ md: "space-between" }}
					gap={6}
				>
					<Heading fontSize={{ base: "lg", md: "xl" }}>Data Berkaitan</Heading>
					<EditButtonSection formHandler={{ formDisabled, setFormDisabled, loading }} />
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
			</form>
		</FormProvider>
	);
}
