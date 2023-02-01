import { deletePegawai } from "@/helpers/api/databases/pegawaiTable";
import { deleteUser } from "@/helpers/api/functions/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
	Skeleton,
} from "@chakra-ui/react";
import { Hash, User } from "lucide-react";

// Components

export default function PegawaiDeleteModal({ disclosure, pegawai }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const toast = useToast();
	const navigate = useNavigate();

	const onDelete = async () => {
		setLoading(true);
		clearTimeout();
		try {
			await deletePegawai(pegawai?.nip);
			await deleteUser(pegawai?.uuidUser);

			toast({
				title: "Berhasil Menghapus Pegawai.",
				description: "Pegawai telah dihapus!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setTimeout(() => {
				setLoading(false);
				onClose();
				navigate(`/pegawai`);
			}, 2000);
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Pegawai.",
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
				<ModalHeader>Hapus Pegawai</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin ingin menghapus pegawai ini?</Text>
					<Skeleton isLoaded={pegawai}>
						<Flex align='center' gap={2}>
							<Icon as={User} fontSize={20} color='cyan.500' />
							<Text fontWeight='bold' fontSize='lg'>
								{pegawai?.nama}
							</Text>
						</Flex>
					</Skeleton>
					<Skeleton isLoaded={pegawai}>
						<Flex align='center' gap={2}>
							<Icon as={Hash} fontSize={20} color='cyan.500' />
							<Text>{pegawai?.nip}</Text>
						</Flex>
					</Skeleton>
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
