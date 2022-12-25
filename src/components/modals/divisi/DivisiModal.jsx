import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DivisiSchema } from "@/helpers/Validations";
import { createDivisi, updateDivisi } from "@/helpers/api/databases/divisiTable";

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
import DivisiForm from "@/components/forms/DivisiForm";

export default function DivisiModal({ type = "add", disclosure, divisi = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const resolver = yupResolver(DivisiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({ nama: divisi?.nama, idInstansi: divisi?.idInstansi });
	}, [divisi]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			if (type === "add") {
				await createDivisi(data);
			} else {
				await updateDivisi(data, divisi?.id);
			}
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Divisi." : "Berhasil Memperbarui Divisi.",
				description: type === "add" ? "Divisi baru telah ditambahkan!" : "Divisi telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Divisi." : "Gagal Memperbarui Divisi.",
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
				<ModalHeader>{type === "add" ? "Tambah Divisi" : "Perbarui Divisi"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-divisi' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<DivisiForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-divisi' colorScheme='cyan'>
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
