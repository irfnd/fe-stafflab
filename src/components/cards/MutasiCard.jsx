import useDokumen from "@/helpers/hooks/useDokumen";
import usePegawaiById from "@/helpers/hooks/usePegawaiById";
import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { Card, CardBody, CardHeader, Text, useColorModeValue } from "@chakra-ui/react";

// Components
import MutasiTable from "@/components/tables/MutasiTable";

export default function MutasiCard({ mutasi }) {
	const { pegawai } = usePegawaiById(mutasi?.nipPegawai);
	const { dokumen } = useDokumen(mutasi?.nipPegawai);
	const selectedDokumen = dokumen?.filter((el) => el.kategori === "mutasi");

	const fromTipe = useSelector((state) => TipePegawaiSelector.selectById(state, mutasi?.detail?.tipe?.from));
	const toTipe = useSelector((state) => TipePegawaiSelector.selectById(state, mutasi?.detail?.tipe?.to));
	const fromStatus = useSelector((state) => StatusPegawaiSelector.selectById(state, mutasi?.detail?.status?.from));
	const toStatus = useSelector((state) => StatusPegawaiSelector.selectById(state, mutasi?.detail?.status?.to));
	const fromInstansi = useSelector((state) => InstansiSelector.selectById(state, mutasi?.detail?.instansi?.from));
	const toInstansi = useSelector((state) => InstansiSelector.selectById(state, mutasi?.detail?.instansi?.to));
	const fromDivisi = useSelector((state) => DivisiSelector.selectById(state, mutasi?.detail?.divisi?.from));
	const toDivisi = useSelector((state) => DivisiSelector.selectById(state, mutasi?.detail?.divisi?.to));
	const fromJabatan = useSelector((state) => JabatanSelector.selectById(state, mutasi?.detail?.jabatan?.from));
	const toJabatan = useSelector((state) => JabatanSelector.selectById(state, mutasi?.detail?.jabatan?.to));
	const fromGolongan = useSelector((state) => GolonganSelector.selectById(state, mutasi?.detail?.golongan?.from));
	const toGolongan = useSelector((state) => GolonganSelector.selectById(state, mutasi?.detail?.golongan?.to));

	const bgCard = useColorModeValue("white", "gray.800");

	return (
		<Card bg={bgCard} display='flex' flexDir='column' p={10} gap={4}>
			<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
				<Text fontSize='2xl' fontWeight='semibold' noOfLines={1}>
					{pegawai?.nama}
				</Text>
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={2}>
				<MutasiTable
					mutasi={mutasi}
					detailMutasi={{
						fromTipe,
						toTipe,
						fromStatus,
						toStatus,
						fromInstansi,
						toInstansi,
						fromDivisi,
						toDivisi,
						fromJabatan,
						toJabatan,
						fromGolongan,
						toGolongan,
					}}
					dokumen={selectedDokumen}
				/>
			</CardBody>
		</Card>
	);
}
