import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PegawaiSchema } from "@/helpers/Validations";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useSelector } from "react-redux";
import Supabase from "@/helpers/Supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Button, Flex, useToast } from "@chakra-ui/react";

// Components
import DataPribadiForm from "@/components/forms/pegawai/DataPribadiForm";
import DokumenLamaranForm from "@/components/forms/pegawai/DokumenLamaranForm";
import IdentitasForm from "@/components/forms/pegawai/IdentitasForm";
import KontakForm from "@/components/forms/pegawai/KontakForm";

export default function TambahForm() {
	const [loading, setLoading] = useState(false);
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);

	const resolver = yupResolver(PegawaiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const status = statusPegawai?.filter((el) => el.id === parseInt(data.status, 10))[0]?.nama?.toLowerCase();
			// Table pegawai
			const { error: errPegawai } = await Supabase.from("pegawai")
				.insert({
					nip: data.nip,
					nama: data.nama,
					email: data.email,
					noTelepon: `+62${data.noTelepon}`,
					idStatus: data.status,
					idInstansi: data.instansi,
					idDivisi: data.divisi,
					idJabatan: data.jabatan,
					idGolongan: data.golongan,
				})
				.single();
			if (errPegawai) throw errPegawai;

			// Table data_pegawai
			const { error: errDataPribadi } = await Supabase.from("data_pribadi")
				.insert({
					nik: data.nik,
					tempatLahir: data.tempatLahir,
					tanggalLahir: data.tanggalLahir,
					jenisKelamin: data.jenisKelamin,
					agama: data.agama,
					kawin: data.kawin,
					alamat: data.alamat,
					nipPegawai: data.nip,
				})
				.single();
			if (errPegawai) throw errDataPribadi;

			// Invoke users
			const { error: errKontak } = await Supabase.functions.invoke("users", {
				headers: {
					authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON}`,
					"content-type": "application/json",
				},
				method: "POST",
				body: {
					email: data.email,
					phone: `+62${data.noTelepon}`,
					email_confirm: true,
					phone_confirm: true,
				},
			});
			if (errKontak) throw errKontak;

			toast({
				title: "Berhasil Menambahkan Pegawai.",
				description: "Pegawai baru telah ditambahkan!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setTimeout(() => {
				setLoading(false);
				mainForm.reset();
				navigate(`/pegawai/${status}`);
			}, 2000);
		} catch (err) {
			console.log(err);
			setLoading(false);
			toast({
				title: "Gagal Menambahkan Pegawai.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<FormProvider {...mainForm}>
			<form onSubmit={mainForm.handleSubmit(onSubmit)}>
				<Flex direction='column' w='full' gap={8}>
					<IdentitasForm />
					<DataPribadiForm />
					<KontakForm />
					<DokumenLamaranForm />
					<Flex justify='flex-end'>
						<Button isLoading={loading} type='submit' colorScheme='cyan' size='lg' w={{ base: "full", md: "fit-content" }}>
							Simpan Pegawai
						</Button>
					</Flex>
				</Flex>
			</form>
		</FormProvider>
	);
}
