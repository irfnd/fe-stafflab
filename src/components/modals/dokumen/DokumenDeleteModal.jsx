import { deleteDokumen } from "@/helpers/api/databases/dokumenTable";
import { deleteDokumen as deleteFileDokumen } from "@/helpers/api/storages/dokumen";
import useDate from "@/helpers/hooks/useDate";
import { useState } from "react";

// Styles & Icons
import {
	Button,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
} from "@chakra-ui/react";
import { FileBadge, FileClock, FileType2 } from "lucide-react";

// Components

export default function DokumenDeleteModal({ disclosure, dokumen }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDelete = async () => {
		setLoading(true);
		try {
			await deleteDokumen(dokumen?.id);
			await deleteFileDokumen(dokumen?.detail?.path);
			setLoading(false);
			toast({
				title: "Berhasil Menghapus Dokumen.",
				description: "Dokumen berhasil dihapus!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Dokumen.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>Hapus Dokumen</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin ingin menghapus dokumen ini?</Text>
					<Flex align='center' gap={2}>
						<Icon as={FileType2} fontSize={20} color='cyan.500' />
						<Text fontWeight='bold' fontSize='lg'>
							{dokumen?.nama}
						</Text>
					</Flex>
					<Flex align='center' gap={2}>
						<Icon as={FileBadge} fontSize={20} color='cyan.500' />
						<Text casing='capitalize'>File {dokumen?.kategori}</Text>
					</Flex>
					<Flex align='center' gap={2}>
						<Icon as={FileClock} fontSize={20} color='cyan.500' />
						<Text>{dokumen && useDate(dokumen?.uploadedAt)}</Text>
					</Flex>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} colorScheme='cyan' onClick={onDelete}>
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
