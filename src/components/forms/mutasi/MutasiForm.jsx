import { createMutasi } from "@/helpers/api/databases/mutasiTable";
import { createDokumen } from "@/helpers/api/databases/dokumenTable";
import { uploadDocument } from "@/helpers/api/storages/dokumen";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePegawai } from "@/helpers/api/databases/pegawaiTable";

// Styles & Icons
import { Button, Divider, Flex, Heading, useColorModeValue, useToast } from "@chakra-ui/react";

// Components & Constants
import DetailGolonganForm from "@/components/forms/mutasi/DetailGolonganForm";
import DetailMutasiForm from "@/components/forms/mutasi/DetailMutasiForm";
import DetailPegawaiForm from "@/components/forms/mutasi/DetailPegawaiForm";
import DetailStatusPegawaiForm from "@/components/forms/mutasi/DetailStatusPegawaiForm";
import DetailTanggalForm from "@/components/forms/mutasi/DetailTanggalForm";
import DetailTipePegawaiForm from "@/components/forms/mutasi/DetailTipePegawaiForm";
import FileMutasiForm from "@/components/forms/nested/FileMutasiForm";

export default function MutasiForm() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const mainForm = useForm({ mode: "onChange" });

	const bgSection = useColorModeValue("white", "gray.800");
	const toast = useToast();

	const detailMutasi = (jenisMutasi, data) => {
		const getData = {
			tipe: { from: data.fromTipe, to: data.fromTipe },
			status: { from: data.fromStatus, to: data.fromStatus },
			instansi: { from: data.fromInstansi, to: data.fromInstansi },
			divisi: { from: data.fromDivisi, to: data.fromDivisi },
			jabatan: { from: data.fromJabatan, to: data.fromJabatan },
			golongan: { from: data.fromGolongan, to: data.fromGolongan },
		};

		if (jenisMutasi === "Golongan") return { ...getData, golongan: { from: data.fromGolongan, to: parseInt(data.toGolongan, 10) } };
		if (jenisMutasi === "Pengangkatan") return { ...getData, tipe: { from: data.fromTipe, to: parseInt(data.toTipe, 10) } };
		if (jenisMutasi === "Pensiun") return { ...getData, status: { from: data.fromStatus, to: parseInt(data.toStatus, 10) } };
		if (jenisMutasi === "PHK") return { ...getData, status: { from: data.fromStatus, to: parseInt(data.toStatus, 10) } };

		return {
			...getData,
			instansi: { from: data.fromInstansi, to: parseInt(data.toInstansi, 10) },
			divisi: { from: data.fromDivisi, to: parseInt(data.toDivisi, 10) },
			jabatan: { from: data.fromJabatan, to: parseInt(data.toJabatan, 10) },
		};
	};

	const onSubmit = async (data) => {
		const { jenisMutasi, dokumen, tanggalMutasi } = data;
		clearTimeout();
		setLoading(true);
		try {
			if (jenisMutasi.length < 1) throw new Error("Jenis mutasi wajib diisi!");
			if (data.dokumen.length < 1) throw new Error("Dokumen berkaitan wajib diisi!");

			if (jenisMutasi === "Golongan") {
				if (data.toGolongan.length < 1) throw new Error("Golongan pegawai wajib diisi!");
			}

			if (jenisMutasi === "Pengangkatan") {
				if (data.toTipe.length < 1) throw new Error("Tipe pegawai wajib diisi!");
			}

			if (jenisMutasi === "PHK" || jenisMutasi === "Pensiun") {
				if (data.toStatus.length < 1) throw new Error("Status pegawai wajib diisi!");
			}

			if (jenisMutasi === "Instansi" || jenisMutasi === "Divisi" || jenisMutasi === "Jabatan") {
				if (data.toInstansi.length < 1) throw new Error("Instansi tujuan wajib diisi!");
				if (data.toDivisi.length < 1) throw new Error("Divisi tujuan wajib diisi!");
				if (data.toJabatan.length < 1) throw new Error("Jabatan tujuan wajib diisi!");
			}

			const uploadedDocuments = await Promise.all(
				dokumen.map(async (file) => {
					const filePath = await uploadDocument({
						folder: pegawai?.nip,
						kategori: "mutasi",
						file: file.dokumen,
						namaFile: file.nama,
						pegawai: pegawai?.nama,
					});
					const fileId = await createDokumen({
						nama: `${file.nama} - ${pegawai?.nama}`,
						detail: { ...filePath },
						kategori: "mutasi",
						nipPegawai: pegawai?.nip,
					});
					return { id: fileId.id, path: filePath.path };
				})
			);

			await createMutasi({
				nipPegawai: pegawai?.nip,
				dokumen: { files: uploadedDocuments },
				detail: detailMutasi(jenisMutasi, data),
				jenisMutasi: jenisMutasi.toLowerCase(),
				tanggalMutasi,
			});

			if (jenisMutasi === "Golongan") await updatePegawai({ idGolongan: data.toGolongan }, pegawai?.nip);
			if (jenisMutasi === "Pengangkatan") await updatePegawai({ idTipe: data.toTipe }, pegawai?.nip);
			if (jenisMutasi === "PHK") await updatePegawai({ idStatus: data.toStatus }, pegawai?.nip);
			if (jenisMutasi === "Pensiun") await updatePegawai({ idStatus: data.toStatus }, pegawai?.nip);
			if (jenisMutasi === "Instansi" || jenisMutasi === "Divisi" || jenisMutasi === "Jabatan") {
				await updatePegawai({ idInstansi: data.toInstansi, idDivisi: data.toDivisi, idJabatan: data.toJabatan }, pegawai?.nip);
			}

			toast({
				title: "Berhasil Menambahkan Mutasi.",
				description: "Mutasi baru telah ditambahkan!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setTimeout(() => {
				setLoading(false);
				mainForm.reset();
				navigate(`/mutasi/list`);
			}, 2000);
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Menambahkan Mutasi.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		mainForm.reset({
			nip: pegawai?.nip,
			nama: pegawai?.nama,
			fromTipe: pegawai?.idTipe,
			fromStatus: pegawai?.idStatus,
			fromInstansi: pegawai?.idInstansi,
			fromDivisi: pegawai?.idDivisi,
			fromJabatan: pegawai?.idJabatan,
			fromGolongan: pegawai?.idGolongan,
			toTipe: "",
			toStatus: "",
			toInstansi: "",
			toDivisi: "",
			toJabatan: "",
			toGolongan: "",
		});
	}, [pegawai]);

	return (
		<FormProvider {...mainForm}>
			<form style={{ width: "100%" }}>
				<Flex direction='column' gap={10} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
					<Flex direction='column' gap={4}>
						<Heading fontSize={{ base: "xl", md: "2xl" }}>Detail Mutasi</Heading>
						<DetailPegawaiForm />
					</Flex>

					<Divider />

					<Flex direction='column' gap={4}>
						<DetailTipePegawaiForm />
						<DetailStatusPegawaiForm />
						<DetailMutasiForm />
						<DetailGolonganForm />
						<DetailTanggalForm />
					</Flex>

					{mainForm.watch("jenisMutasi") && <Divider />}

					<FileMutasiForm />

					{mainForm.watch("jenisMutasi") && (
						<Flex direction='column' align='flex-end' gap={6}>
							<Divider />
							<Button
								isLoading={loading}
								size='lg'
								colorScheme='cyan'
								w={{ base: "full", md: "fit-content" }}
								onClick={mainForm.handleSubmit(onSubmit)}
							>
								Tambah Mutasi
							</Button>
						</Flex>
					)}
				</Flex>
			</form>
		</FormProvider>
	);
}
