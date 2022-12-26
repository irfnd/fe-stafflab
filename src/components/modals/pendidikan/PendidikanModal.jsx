import { PendidikanSchema } from "@/helpers/Validations";
import { createDokumen, updateDokumen } from "@/helpers/api/databases/dokumenTable";
import { createPendidikan, updatePendidikan } from "@/helpers/api/databases/pendidikanTable";
import { deleteDokumen, uploadDocument } from "@/helpers/api/storages/dokumen";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
	useToast,
} from "@chakra-ui/react";

// Components
import PendidikanForm from "@/components/forms/pegawai/PendidikanForm";

export default function PendidikanModal({ type = "add", disclosure, pendidikan = null }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const ijazah = useSelector((state) => DokumenSelector.selectById(state, pendidikan?.dokumen?.ijazah));
	const transkrip = useSelector((state) => DokumenSelector.selectById(state, pendidikan?.dokumen?.transkrip));

	const resolverAdd = yupResolver(PendidikanSchema.add);
	const resolverUpdate = yupResolver(PendidikanSchema.update);
	const mainForm = useForm({ resolver: type === "add" ? resolverAdd : resolverUpdate, mode: "onChange" });
	const toast = useToast();

	useEffect(() => {
		mainForm.reset({
			nama: pendidikan?.nama,
			jenjang: pendidikan?.jenjang,
			jurusan: pendidikan?.jurusan,
			tahunMasuk: pendidikan?.tahunMasuk,
			tahunLulus: pendidikan?.tahunLulus,
			gelar: pendidikan?.gelar,
		});
	}, [pendidikan]);

	const onSubmit = async (data) => {
		const { ijazah: ijazahData, transkrip: transkripData, ...selectedData } = data;
		setLoading(true);
		try {
			if (type === "add") {
				const ijazahFile = await uploadDocument({
					folder: pegawai?.nip,
					kategori: "pendidikan",
					namaFile: `Ijazah ${data.jenjang?.replaceAll("/", "-")}`,
					file: ijazahData,
					pegawai: pegawai?.nama,
				});
				const transkripFile = await uploadDocument({
					folder: pegawai?.nip,
					kategori: "pendidikan",
					namaFile: `Transkrip Nilai ${data.jenjang?.replaceAll("/", "-")}`,
					file: transkripData,
					pegawai: pegawai?.nama,
				});
				const dokumenIjazah = await createDokumen({
					nama: `Ijazah ${data.jenjang?.replaceAll("/", "-")} - ${pegawai?.nama}`,
					detail: ijazahFile,
					kategori: "pendidikan",
					nipPegawai: pegawai?.nip,
				});
				const dokumenTranskrip = await createDokumen({
					nama: `Transkrip Nilai ${data.jenjang?.replaceAll("/", "-")} - ${pegawai?.nama}`,
					detail: transkripFile,
					kategori: "pendidikan",
					nipPegawai: pegawai?.nip,
				});
				await createPendidikan({
					...selectedData,
					dokumen: {
						ijazah: dokumenIjazah.id,
						transkrip: dokumenTranskrip.id,
					},
					nipPegawai: pegawai?.nip,
				});
			}

			if (type === "update") {
				let dokumenIjazah = null;
				let dokumenTranskrip = null;

				if (ijazahData) {
					await deleteDokumen(ijazah?.detail?.path);
					const ijazahFile = await uploadDocument({
						folder: pegawai?.nip,
						kategori: "pendidikan",
						namaFile: `Ijazah ${data.jenjang?.replaceAll("/", "-")}`,
						file: ijazahData,
						pegawai: pegawai?.nama,
					});
					dokumenIjazah = await updateDokumen(
						{
							nama: `Ijazah ${data.jenjang?.replaceAll("/", "-")} - ${pegawai?.nama}`,
							detail: ijazahFile,
						},
						ijazah?.id
					);
				}

				if (transkripData) {
					await deleteDokumen(transkrip?.detail?.path);
					const transkripFile = await uploadDocument({
						folder: pegawai?.nip,
						kategori: "pendidikan",
						namaFile: `Transkrip Nilai ${data.jenjang?.replaceAll("/", "-")}`,
						file: transkripData,
						pegawai: pegawai?.nama,
					});
					dokumenTranskrip = await updateDokumen(
						{
							nama: `Transkrip Nilai ${data.jenjang?.replaceAll("/", "-")} - ${pegawai?.nama}`,
							detail: transkripFile,
						},
						transkrip?.id
					);
				}

				await updatePendidikan(
					{
						...selectedData,
						dokumen: {
							...(dokumenIjazah ? { ijazah: dokumenIjazah?.id } : pendidikan?.dokumen),
							...(dokumenTranskrip ? { transkrip: dokumenTranskrip?.id } : pendidikan?.dokumen),
						},
					},
					pendidikan?.id
				);
			}
			setLoading(false);
			toast({
				title: type === "add" ? "Berhasil Menambahkan Dokumen." : "Berhasil Memperbarui Dokumen.",
				description: type === "add" ? "Dokumen baru telah ditambahkan!" : "Dokumen telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: type === "add" ? "Gagal Menambahkan Dokumen." : "Gagal Memperbarui Dokumen.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const onCancel = () => {
		mainForm.reset();
		onClose();
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onCancel} isCentered scrollBehavior='inside'>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>{type === "add" ? "Tambah Jenjang Pendidikan" : "Perbarui Jenjang Pendidikan"}</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-pendidikan' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<PendidikanForm value={{ ijazah: ijazah?.detail, transkrip: transkrip?.detail }} />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-pendidikan' colorScheme='cyan'>
						{type === "add" ? "Tambah" : "Perbarui"}
					</Button>
					<Button colorScheme='red' variant='ghost' onClick={onCancel}>
						Batal
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
