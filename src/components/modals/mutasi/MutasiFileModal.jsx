import { DokumenSchema } from "@/helpers/Validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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

export default function MutasiFileModal({ type = "add", disclosure, form, fileMutasi = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const resolverAdd = yupResolver(DokumenSchema.add);
	const resolverUpdate = yupResolver(DokumenSchema.update);
	const nestedForm = useForm({ resolver: type === "add" ? resolverAdd : resolverUpdate, mode: "onChange" });
	const { append, update } = form;

	const toast = useToast();

	const onSubmit = (data) => {
		setLoading(true);
		try {
			const now = new Date();
			if (type === "add") append({ ...data, kategori: "mutasi", uploadedAt: now.toISOString() });
			if (type === "update") {
				if (data.dokumen) {
					update(nestedForm.getValues("index"), {
						...nestedForm.getValues(),
						nama: data.nama,
						dokumen: data.dokumen,
					});
				} else {
					update(nestedForm.getValues("index"), {
						...nestedForm.getValues(),
						nama: data.nama,
						dokumen: fileMutasi?.dokumen,
					});
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
			nestedForm.reset();
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
		nestedForm.reset();
		onClose();
	};

	useEffect(() => {
		nestedForm.reset(fileMutasi);
	}, [fileMutasi]);

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onCancel} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>{type === "add" ? "Tambah Dokumen" : "Perbarui Dokumen"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...nestedForm}>
						<form id='dokumen-form' onSubmit={nestedForm.handleSubmit(onSubmit)}>
							<DokumenForm value={fileMutasi?.dokumen} />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='dokumen-form' colorScheme='cyan'>
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
