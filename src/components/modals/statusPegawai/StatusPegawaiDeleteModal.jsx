import Supabase from "@/helpers/Supabase";
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
import { Tags } from "lucide-react";

// Components

export default function DivisiDeleteModal({ disclosure, statusPegawai }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDelete = async () => {
		clearTimeout();
		setLoading(true);
		const { error } = await Supabase.from("status").delete().eq("id", statusPegawai?.id);
		if (error) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Status Pegawai.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: "Berhasil Menghapus Status Pegawai.",
				description: "Status pegawai berhasil dihapus!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
		}
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>Hapus Status Pegawai</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin ingin menghapus status pegawai ini?</Text>
					<Flex align='center' gap={2}>
						<Icon as={Tags} fontSize={20} color='cyan.500' />
						<Text fontWeight='bold' fontSize='lg'>
							{statusPegawai?.nama}
						</Text>
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
