import { deleteCuti } from "@/helpers/api/databases/cutiTable";
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
import { CalendarRange, FileText, User } from "lucide-react";

export default function PengajuanCutiModalDelete({ disclosure, cuti }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDeny = async () => {
		setLoading(true);
		try {
			await deleteCuti(cuti?.id);
			setLoading(false);
			toast({
				title: "Pengajuan Cuti Berhasil Ditolak.",
				description: "Pegawai ditolak untuk cuti.",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
		} catch (err) {
			setLoading(false);
			toast({
				title: "Proses Penolakan Gagal!",
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
				<ModalHeader>Tolak Pengajuan Cuti</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin menolak pengajuan cuti ini?</Text>
					<Flex align='center' gap={2}>
						<Icon as={User} fontSize={20} color='cyan.500' />
						<Text fontWeight='bold' fontSize='lg'>
							{cuti?.pegawai?.nama}
						</Text>
					</Flex>
					<Flex align='center' gap={2}>
						<Icon as={CalendarRange} fontSize={20} color='cyan.500' />
						<Text>{cuti && `${useDate(cuti?.mulaiCuti, false)} - ${useDate(cuti?.selesaiCuti, false)}`}</Text>
					</Flex>
					<Flex align='center' gap={2}>
						<Icon as={FileText} fontSize={20} color='cyan.500' />
						<Text>{cuti?.keterangan}</Text>
					</Flex>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} colorScheme='cyan' onClick={onDeny}>
						Tolak
					</Button>
					<Button colorScheme='red' variant='ghost' onClick={onClose}>
						Batal
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
