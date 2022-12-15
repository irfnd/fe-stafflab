import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InstansiSchema } from "@/helpers/Validations";
import Supabase from "@/helpers/Supabase";

// Styles & Icons
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from "@chakra-ui/react";

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
		clearTimeout();
		setLoading(true);
		const { error } =
			type === "add"
				? await Supabase.from("instansi").insert(data).single()
				: await Supabase.from("instansi").update(data).eq("id", instansi?.id);
		if (error) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Instansi." : "Gagal Memperbarui Instansi.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Instansi." : "Berhasil Memperbarui Instansi.",
				description: type === "add" ? "Instansi baru telah ditambahkan!" : "Instansi telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			mainForm.reset();
			onClose();
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
