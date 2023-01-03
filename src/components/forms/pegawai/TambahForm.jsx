import { PegawaiSchema } from "@/helpers/Validations";
import { createDataPribadi } from "@/helpers/api/databases/dataPribadiTable";
import { createDokumen } from "@/helpers/api/databases/dokumenTable";
import { createPegawai } from "@/helpers/api/databases/pegawaiTable";
import { createUser } from "@/helpers/api/functions/users";
import { uploadDocument } from "@/helpers/api/storages/dokumen";
import { getUrlPhoto, uploadPhoto } from "@/helpers/api/storages/foto";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);

	const resolver = yupResolver(PegawaiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const tipe = tipePegawai?.filter((el) => el.id === parseInt(data.tipe, 10))[0]?.nama?.toLowerCase();

			// Create Data
			const akun = await createUser(data);
			const pegawai = await createPegawai({ ...data, uuidUser: akun?.id });
			await createDataPribadi({ ...data, nipPegawai: pegawai.nip });

			// Upload File
			const foto = await uploadPhoto({
				folder: pegawai.nip,
				kategori: "profil",
				file: data.foto,
				namaFile: "Foto Profil",
				pegawai: pegawai.nama,
			});
			const akta = await uploadDocument({
				folder: pegawai.nip,
				kategori: "pribadi",
				namaFile: "Akta Kelahiran",
				file: data.akta,
				pegawai: pegawai.nama,
			});
			const suratLamaran = await uploadDocument({
				folder: pegawai.nip,
				kategori: "lamaran",
				namaFile: "Surat Lamaran",
				file: data.suratLamaran,
				pegawai: pegawai.nama,
			});
			const cv = await uploadDocument({
				folder: pegawai.nip,
				kategori: "lamaran",
				namaFile: "CV",
				file: data.cv,
				pegawai: pegawai.nama,
			});
			const suratSehat = await uploadDocument({
				folder: pegawai.nip,
				kategori: "lamaran",
				namaFile: "Surat Keterangan Sehat",
				file: data.suratSehat,
				pegawai: pegawai.nama,
			});
			const skck = await uploadDocument({
				folder: pegawai.nip,
				kategori: "lamaran",
				namaFile: "Surat Keterangan Catatan Kriminal",
				file: data.skck,
				pegawai: pegawai.nama,
			});
			const suratKerja = await uploadDocument({
				folder: pegawai.nip,
				kategori: "lamaran",
				namaFile: "Surat Persetujuan Kerja",
				file: data.suratKerja,
				pegawai: pegawai.nama,
			});

			// Create File Data
			await createDokumen({
				nama: `Foto Profile - ${pegawai.nama}`,
				detail: { ...foto, ...getUrlPhoto(foto.path) },
				kategori: "profil",
				nipPegawai: pegawai.nip,
			});
			await createDokumen({
				nama: `Akta Kelahiran - ${pegawai.nama}`,
				detail: akta,
				kategori: "pribadi",
				nipPegawai: pegawai.nip,
			});
			await createDokumen({
				nama: `Surat Lamaran - ${pegawai.nama}`,
				detail: suratLamaran,
				kategori: "lamaran",
				nipPegawai: pegawai.nip,
			});
			await createDokumen({
				nama: `CV - ${pegawai.nama}`,
				detail: cv,
				kategori: "lamaran",
				nipPegawai: pegawai.nip,
			});
			await createDokumen({
				nama: `Surat Keterangan Sehat - ${pegawai.nama}`,
				detail: suratSehat,
				kategori: "lamaran",
				nipPegawai: pegawai.nip,
			});
			await createDokumen({
				nama: `Surat Keterangan Catatan Kriminal - ${pegawai.nama}`,
				detail: skck,
				kategori: "lamaran",
				nipPegawai: pegawai.nip,
			});
			await createDokumen({
				nama: `Surat Persetujuan Kerja - ${pegawai.nama}`,
				detail: suratKerja,
				kategori: "lamaran",
				nipPegawai: pegawai.nip,
			});

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
				navigate(`/pegawai/${tipe}`);
			}, 2000);
		} catch (err) {
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
					<KontakForm />
					<DataPribadiForm />
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
