import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Supabase from "@/helpers/Supabase";

// Styles & Icons
import { Flex, Heading, Icon, Image, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { Award, Building2, Hash, Network, Pocket, Tags } from "lucide-react";

export default function PegawaiCard({ pegawai }) {
	const statusPegawai = useSelector((state) => StatusPegawaiSelector.selectById(state, pegawai?.idStatus));
	const instansi = useSelector((state) => InstansiSelector.selectById(state, pegawai?.idInstansi));
	const jabatan = useSelector((state) => JabatanSelector.selectById(state, pegawai?.idJabatan));
	const divisi = useSelector((state) => DivisiSelector.selectById(state, pegawai?.idDivisi));
	const golongan = useSelector((state) => GolonganSelector.selectById(state, pegawai?.idGolongan));
	const [profilePhoto, setProfilePhoto] = useState();

	const navigate = useNavigate();
	const bgCard = useColorModeValue("white", "gray.800");
	const iconColor = useColorModeValue("cyan.600", "cyan.200");

	const getProfilePhoto = async () => {
		const { data } = await Supabase.from("dokumen").select("detail->publicUrl").match({ nipPegawai: pegawai.nip, kategori: "profil" });
		if (data) setProfilePhoto(data[0].publicUrl);
	};

	useEffect(() => {
		getProfilePhoto();
	}, []);

	return (
		<Flex
			bg={bgCard}
			direction='column'
			shadow='md'
			rounded='md'
			cursor='pointer'
			onClick={() => navigate(`/pegawai/${statusPegawai?.nama?.toLowerCase()}/${pegawai?.nip}`)}
		>
			<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} roundedTop='md'>
				<Flex
					h={{ base: "250px", md: "280px" }}
					backgroundImage={profilePhoto}
					backgroundRepeat='no-repeat'
					backgroundPosition='top'
					backgroundSize='cover'
					objectFit='center'
					roundedTop='md'
				/>
			</Skeleton>
			<Flex direction='column' justify='center' p={6} gap={4} h='full'>
				<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
					<Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
						{pegawai?.nama}
					</Heading>
				</Skeleton>
				<Flex direction='column' gap={2}>
					<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Hash} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{pegawai?.nip}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Tags} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{statusPegawai?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Award} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{jabatan?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Pocket} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{golongan?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Network} fontSize={18} color={iconColor} />
							<Text fontSize={{ base: "xs", sm: "sm" }} noOfLines={1}>
								{divisi?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={profilePhoto && statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
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
