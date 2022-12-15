import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusPegawaiSchema } from "@/helpers/Validations";
import Supabase from "@/helpers/Supabase";

// Styles & Icons
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast } from "@chakra-ui/react";

// Components
import StatusPegawaiForm from "@/components/forms/statusPegawai/StatusPegawaiForm";

export default function StatusPegawaiModal({ type = "add", disclosure, statusPegawai = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const resolver = yupResolver(StatusPegawaiSchema);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({
			nama: statusPegawai?.nama,
			idInstansi: statusPegawai?.idInstansi,
			idDivisi: statusPegawai?.idDivisi,
		});
	}, [statusPegawai]);

	const onSubmit = async (data) => {
		clearTimeout();
		setLoading(true);
		const { error } =
			type === "add"
				? await Supabase.from("status").insert(data).single()
				: await Supabase.from("status").update(data).eq("id", statusPegawai?.id);
		if (error) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Status Pegawai." : "Gagal Memperbarui Status Pegawai.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Status Pegawai." : "Berhasil Memperbarui Status Pegawai.",
				description: type === "add" ? "Status pegawai baru telah ditambahkan!" : "Status pegawai telah diperbarui!",
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
				<ModalHeader>{type === "add" ? "Tambah Status Pegawai" : "Perbarui Status Pegawai"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-status-pegawai' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<StatusPegawaiForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-status-pegawai' colorScheme='cyan'>
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
