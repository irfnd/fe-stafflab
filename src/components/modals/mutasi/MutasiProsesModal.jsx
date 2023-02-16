import { updateDokumen } from "@/helpers/api/databases/dokumenTable";
import { updateMutasi } from "@/helpers/api/databases/mutasiTable";
import { getPegawaiById, updatePegawai } from "@/helpers/api/databases/pegawaiTable";
import { deleteDokumen, uploadDocument } from "@/helpers/api/storages/dokumen";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Styles & Icons
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";

// Components
import DokumenForm from "@/components/forms/DokumenForm";

export default function MutasiProsesModal({ disclosure, mutasi }) {
	const { isOpen, onClose } = disclosure;
	const [pegawai, setPegawai] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const mainForm = useForm({ mode: "onChange" });
	const toast = useToast();

	console.log(mutasi);

	const onSubmit = async (data) => {
		clearTimeout();
		setLoading(true);
		try {
			await deleteDokumen(mutasi?.dokumen?.files[0]?.path);
			const dokumenFile = await uploadDocument({
				folder: pegawai?.nip,
				kategori: "mutasi",
				namaFile: data.nama,
				file: data.dokumen,
				pegawai: pegawai?.nama,
			});
			const dokumenMutasi = await updateDokumen(
				{ nama: `${data.nama} - ${pegawai?.nama}`, detail: { ...dokumenFile } },
				mutasi?.dokumen?.files[0]?.id
			);

			await updateMutasi(
				{
					dokumen: { files: [{ id: dokumenMutasi?.id, path: dokumenFile?.path }] },
					diterima: true,
				},
				mutasi?.id
			);

			if (mutasi?.jenisMutasi === "golongan") await updatePegawai({ idGolongan: mutasi.detail.golongan.to }, pegawai?.nip);
			if (mutasi?.jenisMutasi === "pengangkatan") await updatePegawai({ idTipe: mutasi.detail.tipe.to }, pegawai?.nip);
			if (mutasi?.jenisMutasi === "phk") await updatePegawai({ idStatus: mutasi.detail.status.to }, pegawai?.nip);
			if (mutasi?.jenisMutasi === "pensiun") await updatePegawai({ idStatus: mutasi.detail.status.to }, pegawai?.nip);
			if (mutasi?.jenisMutasi === "instansi" || mutasi?.jenisMutasi === "divisi" || mutasi?.jenisMutasi === "jabatan") {
				await updatePegawai(
					{
						idInstansi: mutasi.detail.instansi.to,
						idDivisi: mutasi.detail.divisi.to,
						idJabatan: mutasi.detail.jabatan.to,
					},
					pegawai?.nip
				);
			}

			toast({
				title: "Proses Persetujuan Berhasil.",
				description: "Pegawai Berhasil Dimutasi!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setTimeout(() => {
				setLoading(false);
				mainForm.reset();
				navigate(`/mutasi/list`);
			}, 2000);
		} catch (err) {
			toast({
				title: "Proses Persetujuan Gagal.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
			setLoading(false);
		}
	};

	const onCancel = () => {
		mainForm.reset();
		onClose();
	};

	const getPegawai = async () => {
		const { data } = await getPegawaiById(mutasi?.nipPegawai);
		if (data) setPegawai(data[0]);
	};

	useEffect(() => {
		mainForm.reset({ nama: mutasi?.dokumen?.files[0]?.path?.split("/").pop().split("-").shift().trim() });
		if (mutasi?.nipPegawai) getPegawai();
	}, [mutasi]);

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onCancel} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>Terima Mutasi Pegawai</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-dokumen' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<DokumenForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-dokumen' colorScheme='cyan'>
						Terima
					</Button>
					<Button colorScheme='red' variant='ghost' onClick={onCancel}>
						Batal
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
