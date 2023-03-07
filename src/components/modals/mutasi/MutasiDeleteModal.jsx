import { deleteDokumen } from "@/helpers/api/databases/dokumenTable";
import { deleteMutasi } from "@/helpers/api/databases/mutasiTable";
import { getPegawaiById, updatePegawai } from "@/helpers/api/databases/pegawaiTable";
import { deleteDokumen as deleteDoc } from "@/helpers/api/storages/dokumen";
import { useEffect, useState } from "react";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { useSelector } from "react-redux";
import { deleteClaims } from "@/helpers/api/functions/claims";

// Styles & Icons
import {
	Button,
	Flex,
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

// Components

export default function MutasiDeleteModal({ disclosure, mutasi }) {
	const { isOpen, onClose } = disclosure;
	const [pegawai, setPegawai] = useState(null);
	const [loading, setLoading] = useState(false);
	const jabatanPegawai = useSelector(JabatanSelector.selectAll);
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
			const getJabatanTo = jabatanPegawai?.filter((el) => el.id === parseInt(mutasi?.detail?.jabatan?.to, 10))[0]?.nama?.toLowerCase();
			const getJabatanFrom = jabatanPegawai?.filter((el) => el.id === parseInt(mutasi?.detail?.jabatan?.from, 10))[0]?.nama?.toLowerCase();
			if (getJabatanTo.length > 0 && getJabatanFrom.length > 0) {
				if (getJabatanTo !== getJabatanFrom && getJabatanTo === "manajer") {
					await deleteClaims({ claim: "claims", uid: pegawai?.uuidUser });
				}
			}
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

	const getPegawai = async () => {
		const { data } = await getPegawaiById(mutasi?.nipPegawai);
		if (data) setPegawai(data[0]);
	};

	useEffect(() => {
		if (mutasi?.nipPegawai) getPegawai();
	}, [mutasi]);

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
