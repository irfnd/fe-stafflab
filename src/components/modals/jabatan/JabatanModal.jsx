import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JabatanSchema } from "@/helpers/Validations";
import Supabase from "@/helpers/Supabase";

// Styles & Icons
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from "@chakra-ui/react";

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
		clearTimeout();
		setLoading(true);
		const { error } =
			type === "add" ? await Supabase.from("jabatan").insert(data).single() : await Supabase.from("jabatan").update(data).eq("id", jabatan?.id);
		if (error) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Jabatan." : "Gagal Memperbarui Jabatan.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Jabatan." : "Berhasil Memperbarui Jabatan.",
				description: type === "add" ? "Jabatan baru telah ditambahkan!" : "Jabatan telah diperbarui!",
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
