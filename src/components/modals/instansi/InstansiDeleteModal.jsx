import { deleteInstansi } from "@/helpers/api/databases/instansiTable";
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
import { Building2, MapPin } from "lucide-react";

// Components

export default function InstansiDeleteModal({ disclosure, instansi }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDelete = async () => {
		setLoading(true);
		try {
			await deleteInstansi(instansi?.id);
			setLoading(false);
			toast({
				title: "Berhasil Menghapus Instansi.",
				description: "Instansi berhasil dihapus!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Instansi.",
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
				<ModalHeader>Hapus Instansi</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin ingin menghapus instansi ini?</Text>
					<Flex align='center' gap={2}>
						<Icon as={Building2} fontSize={20} color='cyan.500' />
						<Text fontWeight='bold' fontSize='lg'>
							{instansi?.nama}
						</Text>
					</Flex>
					<Flex align='center' gap={2}>
						<Icon as={MapPin} fontSize={20} color='cyan.500' />
						<Text>{instansi?.alamat}</Text>
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
