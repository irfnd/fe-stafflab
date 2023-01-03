import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

// Components & Constants
import DetailGolonganForm from "@/components/forms/mutasi/DetailGolonganForm";
import DetailMutasiForm from "@/components/forms/mutasi/DetailMutasiForm";
import DetailPegawaiForm from "@/components/forms/mutasi/DetailPegawaiForm";
import DetailStatusPegawaiForm from "@/components/forms/mutasi/DetailStatusPegawaiForm";
import DetailTanggalForm from "@/components/forms/mutasi/DetailTanggalForm";
import DetailTipePegawaiForm from "@/components/forms/mutasi/DetailTipePegawaiForm";
import FilesList from "@/components/lists/FilesList";

export default function MutasiForm() {
	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const mainForm = useForm({ mode: "onChange" });

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

	const bgSection = useColorModeValue("white", "gray.800");

	return (
		<FormProvider {...mainForm}>
			<form style={{ width: "100%" }}>
				<Flex direction='column' gap={6} bg={bgSection} px={8} py={10} shadow='md' rounded='md'>
					<Heading fontSize={{ base: "xl", md: "2xl" }}>Detail Mutasi</Heading>
					<DetailPegawaiForm />
					<DetailTipePegawaiForm />
					<DetailStatusPegawaiForm />
					<DetailMutasiForm />
					<DetailGolonganForm />
					<DetailTanggalForm />
					<Flex direction='column' gap={6}>
						<Heading fontSize={{ base: "xl", md: "2xl" }}>Dokumen Berkaitan</Heading>
						<FilesList />
					</Flex>
				</Flex>
			</form>
		</FormProvider>
	);
}
