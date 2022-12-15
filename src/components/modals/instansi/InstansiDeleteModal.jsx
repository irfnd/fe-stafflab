import Supabase from "@/helpers/Supabase";
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
	useToast,
	Flex,
	Icon,
} from "@chakra-ui/react";
import { Building2, MapPin } from "lucide-react";

// Components

export default function InstansiDeleteModal({ disclosure, instansi }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDelete = async () => {
		clearTimeout();
		setLoading(true);
		const { error } = await Supabase.from("instansi").delete().eq("id", instansi?.id);
		if (error) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Instansi.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: "Berhasil Menghapus Instansi.",
				description: "Instansi berhasil dihapus!",
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
					<Flex gap={2}>
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
