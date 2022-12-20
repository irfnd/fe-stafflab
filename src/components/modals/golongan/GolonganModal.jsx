import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GolonganSchema } from "@/helpers/Validations";
import Supabase from "@/helpers/Supabase";

// Styles & Icons
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from "@chakra-ui/react";

// Components
import GolonganForm from "@/components/forms/golongan/GolonganForm";

export default function GolonganModal({ type = "add", disclosure, golongan = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const resolver = yupResolver(GolonganSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({ nama: golongan?.nama, keterangan: golongan?.keterangan });
	}, [golongan]);

	const onSubmit = async (data) => {
		clearTimeout();
		setLoading(true);
		const { error } =
			type === "add"
				? await Supabase.from("golongan").insert(data).single()
				: await Supabase.from("golongan").update(data).eq("id", golongan?.id);
		if (error) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Golongan." : "Gagal Memperbarui Golongan.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Golongan." : "Berhasil Memperbarui Golongan.",
				description: type === "add" ? "Golongan baru telah ditambahkan!" : "Golongan telah diperbarui!",
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
				<ModalHeader>{type === "add" ? "Tambah Golongan" : "Perbarui Golongan"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-golongan' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<GolonganForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-golongan' colorScheme='cyan'>
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
