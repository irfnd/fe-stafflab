import { deleteDokumen } from "@/helpers/api/databases/dokumenTable";
import { deletePendidikan } from "@/helpers/api/databases/pendidikanTable";
import { deleteDokumen as deleteFileDokumen } from "@/helpers/api/storages/dokumen";
import useDate from "@/helpers/hooks/useDate";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
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
import { Backpack, Building2, CalendarCheck2, FileClock, GraduationCap, Lightbulb } from "lucide-react";

// Components

export default function PendidikanDeleteModal({ disclosure, pendidikan }) {
	const { isOpen, onClose } = disclosure;

	const ijazah = useSelector((state) => DokumenSelector.selectById(state, pendidikan?.dokumen?.ijazah));
	const transkrip = useSelector((state) => DokumenSelector.selectById(state, pendidikan?.dokumen?.transkrip));
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const onDelete = async () => {
		setLoading(true);
		try {
			await deleteDokumen(pendidikan?.dokumen?.ijazah);
			await deleteDokumen(pendidikan?.dokumen?.transkrip);
			await deleteFileDokumen(ijazah?.detail?.path);
			await deleteFileDokumen(transkrip?.detail?.path);
			await deletePendidikan(pendidikan?.id);
			setLoading(false);
			toast({
				title: "Berhasil Menghapus Jenjang Pendidikan.",
				description: "Jenjang Pendidikan berhasil dihapus!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Menghapus Jenjang Pendidikan.",
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
				<ModalHeader>Hapus Jenjang Pendidikan</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody display='flex' flexDirection='column' gap={2}>
					<Text mb={4}>Apakah Anda yakin ingin menghapus jenjang pendidikan ini?</Text>
					<Flex align='center' gap={2}>
						<Icon as={Backpack} fontSize={20} color='cyan.500' />
						<Text fontWeight='bold' fontSize='lg'>
							{pendidikan?.jenjang}
						</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={Building2} fontSize={20} color='cyan.500' />
						<Text casing='capitalize'>{pendidikan?.nama}</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={Lightbulb} fontSize={20} color='cyan.500' />
						<Text casing='capitalize'>{pendidikan?.jurusan}</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={CalendarCheck2} fontSize={20} color='cyan.500' />
						<Text>
							{pendidikan?.tahunMasuk} - {pendidikan?.tahunLulus}
						</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={GraduationCap} fontSize={20} color='cyan.500' />
						<Text>{pendidikan?.gelar}</Text>
					</Flex>
					<Flex gap={2}>
						<Icon as={FileClock} fontSize={20} color='cyan.500' />
						<Text>{pendidikan && useDate(pendidikan?.createdAt)}</Text>
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
