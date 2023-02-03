import { updatePegawai } from "@/helpers/api/databases/pegawaiTable";
import { deleteMutasi } from "@/helpers/api/databases/mutasiTable";
import { deleteDokumen } from "@/helpers/api/databases/dokumenTable";
import { deleteDokumen as deleteDoc } from "@/helpers/api/storages/dokumen";
import { useState } from "react";

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
	Text,
	Flex,
	useToast,
} from "@chakra-ui/react";

// Components

export default function MutasiDeleteModal({ disclosure, mutasi }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const onDelete = async () => {
		setLoading(true);
		try {
			const newData = {
				idTipe: mutasi?.detail?.tipe?.from,
				idStatus: mutasi?.detail?.status?.from,
				idInstansi: mutasi?.detail?.instansi?.from,
				idDivisi: mutasi?.detail?.divisi?.from,
				idJabatan: mutasi?.detail?.jabatan?.from,
				idGolongan: mutasi?.detail?.golongan?.from,
			};

			await Promise.all(
				mutasi?.dokumen?.files?.map(async (file) => {
					try {
						await deleteDoc(file?.path);
						await deleteDokumen(file?.id);
						return true;
					} catch (err) {
						return false;
					}
				})
			);
			await updatePegawai(newData, mutasi?.nipPegawai);
			await deleteMutasi(mutasi?.id);

			toast({
				title: "Berhasil Menghapus Mutasi.",
				description: "Mutasi telah dihapus!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setLoading(false);
			onClose();
		} catch (err) {
			toast({
				title: "Gagal Menghapus Mutasi.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
			setLoading(false);
		}
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered scrollBehavior='inside'>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>Hapus Mutasi</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Flex direction='column' gap={1} mb={4}>
						<Text>Apakah Anda yakin ingin menghapus mutasi ini?</Text>
						<Text fontWeight='semibold'>Mutasi pegawai akan dibatalkan.</Text>
					</Flex>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='dokumen-form' colorScheme='cyan' onClick={onDelete}>
						Hapus
					</Button>
					<Button colorScheme='red' variant='ghost' onClick={onClose}>
						Batal
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
