import { InstansiSchema } from "@/helpers/Validations";
import { createInstansi, updateInstansi } from "@/helpers/api/databases/instansiTable";
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
import InstansiForm from "@/components/forms/instansi/InstansiForm";

export default function InstansiModal({ type = "add", disclosure, instansi = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const resolver = yupResolver(InstansiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({ nama: instansi?.nama, alamat: instansi?.alamat });
	}, [instansi]);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			if (type === "add") {
				await createInstansi(data);
			} else {
				await updateInstansi(data, instansi?.id);
			}
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Instansi." : "Berhasil Memperbarui Instansi.",
				description: type === "add" ? "Instansi baru telah ditambahkan!" : "Instansi telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Instansi." : "Gagal Memperbarui Instansi.",
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
				<ModalHeader>{type === "add" ? "Tambah Instansi" : "Perbarui Instansi"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-instansi' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<InstansiForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-instansi' colorScheme='cyan'>
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
