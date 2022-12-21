import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { GolonganSelector } from "@/helpers/redux/slices/GolonganSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Styles & Icons
import { Flex, Heading, Icon, Image, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { Award, Building2, Hash, Network, Pocket, Tags } from "lucide-react";

const IMAGE =
	"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80";

export default function PegawaiCard({ pegawai }) {
	const statusPegawai = useSelector((state) => StatusPegawaiSelector.selectById(state, pegawai?.idStatus));
	const instansi = useSelector((state) => InstansiSelector.selectById(state, pegawai?.idInstansi));
	const jabatan = useSelector((state) => JabatanSelector.selectById(state, pegawai?.idJabatan));
	const divisi = useSelector((state) => DivisiSelector.selectById(state, pegawai?.idDivisi));
	const golongan = useSelector((state) => GolonganSelector.selectById(state, pegawai?.idGolongan));

	const navigate = useNavigate();
	const bgCard = useColorModeValue("white", "gray.800");
	const iconColor = useColorModeValue("cyan.600", "cyan.200");

	return (
		<Flex
			bg={bgCard}
			direction='column'
			shadow='md'
			rounded='md'
			h='fit-content'
			cursor='pointer'
			onClick={() => navigate(`/pegawai/${statusPegawai?.nama?.toLowerCase()}/${pegawai?.nip}`)}
		>
			<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} roundedTop='md'>
				<Flex h='200px'>
					<Image src={IMAGE} boxSize='full' roundedTop='md' fit='cover' />
				</Flex>
			</Skeleton>
			<Flex direction='column' justify='center' p={6} gap={4} h='full'>
				<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
					<Heading fontSize='2xl' noOfLines={1}>
						{pegawai?.nama}
					</Heading>
				</Skeleton>
				<Flex direction='column' gap={2}>
					<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Hash} fontSize={18} color={iconColor} />
							<Text fontSize='sm' noOfLines={1}>
								{pegawai?.nip}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Tags} fontSize={18} color={iconColor} />
							<Text fontSize='sm' noOfLines={1}>
								{statusPegawai?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Award} fontSize={18} color={iconColor} />
							<Text fontSize='sm' noOfLines={1}>
								{jabatan?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Pocket} fontSize={18} color={iconColor} />
							<Text fontSize='sm' noOfLines={1}>
								{golongan?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Network} fontSize={18} color={iconColor} />
							<Text fontSize='sm' noOfLines={1}>
								{divisi?.nama}
							</Text>
						</Flex>
					</Skeleton>

					<Skeleton isLoaded={statusPegawai && instansi && jabatan && divisi && golongan} rounded='md'>
						<Flex align='center' gap={2}>
							<Icon as={Building2} fontSize={18} color={iconColor} />
							<Text fontSize='sm' noOfLines={1}>
								{instansi?.nama}
							</Text>
						</Flex>
					</Skeleton>
				</Flex>
			</Flex>
		</Flex>
	);
}
