import Supabase from "@/helpers/Supabase";
import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

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
import { Award, Building2, Network } from "lucide-react";

// Components

export default function JabatanDeleteModal({ disclosure, jabatan }) {
	const { isOpen, onClose } = disclosure;
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDelete = async () => {
		clearTimeout();
		setLoading(true);
		const { error } = await Supabase.from("jabatan").delete().eq("id", jabatan?.id);
		if (error) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Jabatan.",
				description: error.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		} else {
			setLoading(false);
			toast({
				title: "Berhasil Menghapus Jabatan.",
				description: "Jabatan berhasil dihapus!",
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
				<ModalHeader>Hapus Jabatan</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin ingin menghapus jabatan ini?</Text>
					<Flex align='center' gap={2}>
						<Icon as={Award} fontSize={20} color='cyan.500' />
						<Text fontWeight='bold' fontSize='lg'>
							{jabatan?.nama}
						</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={Building2} fontSize={20} color='cyan.500' />
						<Text>{instansi?.filter((item) => item.id === jabatan?.idInstansi)[0]?.nama}</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={Network} fontSize={20} color='cyan.500' />
						<Text>{divisi?.filter((item) => item.id === jabatan?.idDivisi)[0]?.nama}</Text>
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
