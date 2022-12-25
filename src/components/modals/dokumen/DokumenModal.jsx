import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DivisiSchema } from "@/helpers/Validations";
import { uploadDocument, deleteDokumen, renameDokumen } from "@/helpers/api/storages/dokumen";
import { createDokumen, updateDokumen } from "@/helpers/api/databases/dokumenTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";

// Styles & Icons
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
} from "@chakra-ui/react";

// Components
import DokumenForm from "@/components/forms/DokumenForm";

export default function DokumenModal({ type = "add", disclosure, category, dokumen = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const resolver = yupResolver(DivisiSchema);
	const mainForm = useForm({ mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({ nama: dokumen?.nama?.split("-").shift().trim() });
	}, [dokumen]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			if (type === "add") {
				const dokumenFile = await uploadDocument({
					folder: pegawai?.nip,
					kategori: category,
					namaFile: data.nama,
					file: data.dokumen,
					pegawai: pegawai?.nama,
				});
				await createDokumen({
					nama: `${data.nama} - ${pegawai?.nama}`,
					detail: dokumenFile,
					kategori: category,
					nipPegawai: pegawai?.nip,
				});
			}

			if (type === "update") {
				if (data.dokumen) {
					await deleteDokumen(dokumen?.detail?.path);
					const dokumenFile = await uploadDocument({
						folder: pegawai?.nip,
						kategori: category,
						namaFile: data.nama,
						file: data.dokumen,
						pegawai: pegawai?.nama,
					});
					await updateDokumen({ nama: `${data.nama} - ${pegawai?.nama}`, detail: { ...dokumenFile } }, dokumen?.id);
				} else {
					const renamedDokumen = await renameDokumen(dokumen?.detail?.path, `${data.nama} - ${pegawai?.nama}`);
					await updateDokumen({ nama: `${data.nama} - ${pegawai?.nama}`, detail: { ...renamedDokumen } }, dokumen?.id);
				}
			}

			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Dokumen." : "Berhasil Memperbarui Dokumen.",
				description: type === "add" ? "Dokumen baru telah ditambahkan!" : "Dokumen telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Dokumen." : "Gagal Memperbarui Dokumen.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const onCancel = () => {
		mainForm.reset();
		onClose();
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onCancel} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>{type === "add" ? "Tambah Dokumen" : "Perbarui Dokumen"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-dokumen' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<DokumenForm value={dokumen?.detail} />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-dokumen' colorScheme='cyan'>
						{type === "add" ? "Tambah" : "Perbarui"}
					</Button>
					<Button colorScheme='red' variant='ghost' onClick={onCancel}>
						Batal
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
