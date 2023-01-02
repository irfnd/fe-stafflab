import useDokumen from "@/helpers/hooks/useDokumen";
import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, Icon, Image, Skeleton, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue } from "@chakra-ui/react";
import { Award, Backpack, Building2, CheckCircle, Hash, Home, Network, Pocket, Tags, XCircle } from "lucide-react";

export default function PegawaiCard({ pegawai, page }) {
	const statusPegawai = useSelector((state) => StatusPegawaiSelector.selectById(state, pegawai?.idStatus));
	const tipePegawai = useSelector((state) => TipePegawaiSelector.selectById(state, pegawai?.idTipe));
	const instansi = useSelector((state) => InstansiSelector.selectById(state, pegawai?.idInstansi));
	const jabatan = useSelector((state) => JabatanSelector.selectById(state, pegawai?.idJabatan));
	const divisi = useSelector((state) => DivisiSelector.selectById(state, pegawai?.idDivisi));
	const golongan = useSelector((state) => GolonganSelector.selectById(state, pegawai?.idGolongan));
	const dokumen = useSelector(DokumenSelector.selectAll);
	const [profilePhoto, setProfilePhoto] = useState(null);

	const navigate = useNavigate();
	const bgCard = useColorModeValue("white", "gray.800");
	const iconColor = useColorModeValue("cyan.600", "cyan.200");

	const tagDynamic = (status) => {
		switch (status) {
			case "Cuti":
				return { icon: Home, color: "yellow" };
			case "Pensiun":
				return { icon: Backpack, color: "gray" };
			case "PHK":
				return { icon: XCircle, color: "red" };
			default:
				return { icon: CheckCircle, color: "cyan" };
		}
	};

	useDokumen(pegawai.nip);

	useEffect(() => {
		setProfilePhoto(dokumen?.filter((el) => el.kategori === "profil")[0]?.detail?.publicUrl);
	}, [dokumen]);

	return (
		<Flex
			position='relative'
			bg={bgCard}
			direction='column'
			shadow='md'
			rounded='md'
			cursor='pointer'
			onClick={() =>
				navigate(
					["mutasi", "cuti"].includes(page)
						? `/${page}/tambah/${pegawai?.nip}`
						: `/pegawai/${tipePegawai?.nama?.toLowerCase()}/${pegawai?.nip}`
				)
			}
		>
			<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
				<Tag position='absolute' top={2} right={2} w='fit-content' size='lg' colorScheme={tagDynamic(statusPegawai?.nama).color}>
					<TagLeftIcon as={tagDynamic(statusPegawai?.nama).icon} />
					<TagLabel>{statusPegawai?.nama}</TagLabel>
				</Tag>
			</Skeleton>

			<Flex pt={6} justify='center'>
				<Skeleton
					isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan}
					rounded='full'
					display='flex'
					justifyContent='center'
					boxSize='200px'
				>
					<Image src={profilePhoto} alt='Foto Profil' rounded='full' />
				</Skeleton>
			</Flex>

			<Flex direction='column' justify='center' p={6} gap={4} h='full'>
				<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
					<Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
						{pegawai?.nama}
					</Heading>
				</Skeleton>

				<Flex direction='column' gap={2}>
					<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Hash} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{pegawai?.nip}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Tags} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{tipePegawai?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Award} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{jabatan?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Pocket} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{golongan?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Network} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{divisi?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && tipePegawai && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Building2} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{instansi?.nama}
							</Text>
						</Flex>
					</Skeleton>
				</Flex>
			</Flex>
		</Flex>
	);
}
