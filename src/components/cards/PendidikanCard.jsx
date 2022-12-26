import Supabase from "@/helpers/Supabase";
import useDate from "@/helpers/hooks/useDate";
import { DokumenSelector } from "@/helpers/redux/slices/DokumenSlice";
import fileDownload from "js-file-download";
import { useState } from "react";
import { useSelector } from "react-redux";

// Styles & Icons
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Icon, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Building2, CalendarCheck2, DownloadCloud, FileClock, GraduationCap, Lightbulb } from "lucide-react";

// Components
import PendidikanCardMenu from "@/components/menus/PendidikanCardMenu";

export default function PendidikanCard({ pendidikan }) {
	const [loading, setLoading] = useState({ ijazah: false, transkrip: false });

	const ijazah = useSelector((state) => DokumenSelector.selectById(state, pendidikan?.dokumen?.ijazah));
	const transkrip = useSelector((state) => DokumenSelector.selectById(state, pendidikan?.dokumen?.transkrip));

	const toast = useToast();

	const borderFileCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	const onDownload = async (path, dokumen) => {
		setLoading((prev) => ({ ...prev, [dokumen]: true }));
		try {
			const { data, error } = await Supabase.storage.from("dokumen").download(path);
			if (error) throw error;
			fileDownload(data, path?.split("/").pop());
			setLoading((prev) => ({ ...prev, [dokumen]: false }));
			toast({
				title: "Berhasil Mengunduh Dokumen.",
				description: "Dokumen berhasil diunduh!",
				status: "success",
				position: "top",
				duration: 2000,
			});
		} catch (err) {
			setLoading((prev) => ({ ...prev, [dokumen]: false }));
			toast({
				title: "Gagal Mengunduh Dokumen.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Card bg='transparent' display='flex' flexDir='column' p={4} gap={4} border='1px solid' borderColor={borderFileCard}>
			<CardHeader display='flex' justifyContent='space-between' alignItems='center' p={0}>
				<Text fontSize='lg' fontWeight='semibold' noOfLines={1}>
					{pendidikan.jenjang}
				</Text>
				<PendidikanCardMenu pendidikan={pendidikan} />
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={2}>
				<Flex align='center' gap={2}>
					<Icon as={Building2} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						{pendidikan.nama}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={Lightbulb} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						{pendidikan.jurusan}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={CalendarCheck2} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						{pendidikan.tahunLulus} - {pendidikan.tahunLulus}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={GraduationCap} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						{pendidikan.gelar || "-"}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={FileClock} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						{useDate(pendidikan.createdAt)}
					</Text>
				</Flex>
			</CardBody>
			<CardFooter display='flex' flexDir='column' p={0} gap={2}>
				<Button
					isLoading={loading.ijazah}
					variant='outline'
					colorScheme='cyan'
					size={{ base: "sm", md: "md" }}
					leftIcon={<DownloadCloud size={18} />}
					onClick={() => onDownload(ijazah?.detail?.path, "ijazah")}
				>
					Unduh Ijazah
				</Button>
				<Button
					isLoading={loading.transkrip}
					variant='outline'
					colorScheme='cyan'
					size={{ base: "sm", md: "md" }}
					leftIcon={<DownloadCloud size={18} />}
					onClick={() => onDownload(transkrip?.detail?.path, "transkrip")}
				>
					Unduh Transkrip Nilai
				</Button>
			</CardFooter>
		</Card>
	);
}
