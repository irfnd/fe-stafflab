import { JabatanSchema } from "@/helpers/Validations";
import { createJabatan, updateJabatan } from "@/helpers/api/databases/jabatanTable";
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
import JabatanForm from "@/components/forms/jabatan/JabatanForm";

export default function JabatanModal({ type = "add", disclosure, jabatan = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const resolver = yupResolver(JabatanSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({ nama: jabatan?.nama, idInstansi: jabatan?.idInstansi, idDivisi: jabatan?.idDivisi });
	}, [jabatan]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			if (type === "add") {
				await createJabatan(data);
			} else {
				await updateJabatan(data, jabatan?.id);
			}
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Jabatan." : "Berhasil Memperbarui Jabatan.",
				description: type === "add" ? "Jabatan baru telah ditambahkan!" : "Jabatan telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Jabatan." : "Gagal Memperbarui Jabatan.",
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
				<ModalHeader>{type === "add" ? "Tambah Jabatan" : "Perbarui Jabatan"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-jabatan' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<JabatanForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-jabatan' colorScheme='cyan'>
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
