import { createMutasi } from "@/helpers/api/databases/MutasiTable";
import { createDokumen } from "@/helpers/api/databases/dokumenTable";
import { uploadDocument } from "@/helpers/api/storages/dokumen";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import useDataPribadi from "@/helpers/hooks/useDataPribadi";

export default function MutasiForm() {
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const mainForm = useForm({ mode: "onChange" });

	const bgSection = useColorModeValue("white", "gray.800");
	const toast = useToast();

	const detailMutasi = (jenisMutasi, formData) => {
		const getData = {
			tipe: { from: formData.fromTipe, to: formData.fromTipe },
			status: { from: formData.fromStatus, to: formData.fromStatus },
			instansi: { from: formData.fromInstansi, to: formData.fromInstansi },
			divisi: { from: formData.fromDivisi, to: formData.fromDivisi },
			jabatan: { from: formData.fromJabatan, to: formData.fromJabatan },
			golongan: { from: formData.fromGolongan, to: formData.fromGolongan },
		};

		if (jenisMutasi === "Golongan") return { ...getData, golongan: { from: formData.fromGolongan, to: formData.toGolongan } };
		if (jenisMutasi === "Pengangkatan") return { ...getData, tipe: { from: formData.formTipe, to: formData.toTipe } };
		if (jenisMutasi === "Pensiun") return { ...getData, status: { from: formData.fromStatus, to: formData.toStatus } };
		if (jenisMutasi === "PHK") return { ...getData, status: { from: formData.fromStatus, to: formData.toStatus } };

		return {
			...getData,
			instansi: { from: formData.fromInstansi, to: formData.toInstansi },
			divisi: { from: formData.fromDivisi, to: formData.toDivisi },
			jabatan: { from: formData.fromJabatan, to: formData.toJabatan },
		};
	};

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			if (data.jenisMutasi.length < 1) throw new Error("Jenis mutasi wajib diisi!");
			if (data.dokumen.length < 1) throw new Error("Dokumen berkaitan wajib diisi!");

			if (data.jenisMutasi === "Golongan") {
				if (data.toGolongan.length < 1) throw new Error("Golongan pegawai wajib diisi!");
			}

			if (data.jenisMutasi === "Pengangkatan") {
				if (data.toTipe.length < 1) throw new Error("Tipe pegawai wajib diisi!");
			}

			if (data.jenisMutasi === "PHK" || data.jenisMutasi === "Pensiun") {
				if (data.toStatus.length < 1) throw new Error("Status pegawai wajib diisi!");
			}

			if (data.jenisMutasi === "Instansi" || data.jenisMutasi === "Divisi" || data.jenisMutasi === "Jabatan") {
				if (data.toInstansi.length < 1) throw new Error("Instansi tujuan wajib diisi!");
				if (data.toDivisi.length < 1) throw new Error("Divisi tujuan wajib diisi!");
				if (data.toJabatan.length < 1) throw new Error("Jabatan tujuan wajib diisi!");
			}

			const dokumen = await data.dokumen.map(async (file) => {
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
			});

			console.log(dokumen);

			// await createMutasi({
			// 	nipPegawai: pegawai?.nip,
			// 	jenisMutasi: data.jenisMutasi,
			// 	tanggalMutasi: data.tanggalMutasi,
			// 	detail: detailMutasi(data.jenisMutasi, data),
			// 	dokumen,
			// });

			if (data.jenisMutasi === "Golongan") await updatePegawai({ idGolongan: data.toGolongan }, pegawai?.nip);
			if (data.jenisMutasi === "Pengangkatan") await updatePegawai({ idTipe: data.toTipe }, pegawai?.nip);
			if (data.jenisMutasi === "PHK") await updatePegawai({ idStatus: data.toStatus }, pegawai?.nip);
			if (data.jenisMutasi === "Pensiun") await updatePegawai({ idStatus: data.toStatus }, pegawai?.nip);
			if (data.jenisMutasi === "Instansi" || data.jenisMutasi === "Divisi" || data.jenisMutasi === "Jabatan") {
				await updatePegawai({ idInstansi: data.toInstansi, idDivisi: data.toDivisi, idJabatan: data.toJabatan });
			}

			toast({
				title: "Berhasil Menambahkan Mutasi.",
				description: "Mutasi baru telah ditambahkan!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			setLoading(false);
			mainForm.reset();
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
