import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { uploadDocument } from "@/helpers/api/storages/dokumen";
import { createDokumen } from "@/helpers/api/databases/dokumenTable";
import { updateCuti } from "@/helpers/api/databases/cutiTable";

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
import PengajuanCutiForm from "@/components/forms/cuti/PengajuanCutiForm";

export default function PengajuanCutiModal({ disclosure, cuti }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const mainForm = useForm({ mode: "onChange" });
	const toast = useToast();

	const onApprove = async (data) => {
		setLoading(true);
		try {
			const dokumenFile = await uploadDocument({
				folder: cuti?.nipPegawai,
				kategori: "cuti",
				namaFile: cuti?.keterangan,
				file: data.dokumen,
				pegawai: cuti?.pegawai?.nama,
			});
			await createDokumen({
				nama: `${cuti?.keterangan} - ${cuti?.pegawai?.nama}`,
				detail: dokumenFile,
				kategori: "cuti",
				nipPegawai: cuti?.nipPegawai,
			});
			await updateCuti({ approve: true, dokumen: dokumenFile }, cuti?.id);
			setLoading(false);
			toast({
				title: "Pengajuan Cuti Disetujui.",
				description: "Pegawai disetujui untuk cuti.",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: "Pengajuan Cuti Ditolak!.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const onCancel = () => {
		onClose();
		mainForm.reset();
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onCancel} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>Terima Pengajuan Cuti</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='pengajuan-cuti-form' onSubmit={mainForm.handleSubmit(onApprove)}>
							<PengajuanCutiForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='pengajuan-cuti-form' colorScheme='cyan'>
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
