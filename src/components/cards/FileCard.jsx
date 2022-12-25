import useDate from "@/helpers/hooks/useDate";
import Supabase from "@/helpers/Supabase";
import fileDownload from "js-file-download";
import { useState } from "react";

// Styles & Icons
import { Card, CardBody, CardHeader, CardFooter, Flex, Icon, Text, useColorModeValue, Button, useToast } from "@chakra-ui/react";
import { FileBadge, FileClock, DownloadCloud } from "lucide-react";

// Components
import FileCardMenu from "@/components/menus/FileCardMenu";

export default function FileCard({ file }) {
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const borderFileCard = useColorModeValue("gray.200", "whiteAlpha.300");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.400");

	const onDownload = async () => {
		setLoading(true);
		try {
			const { data, error } = await Supabase.storage.from("dokumen").download(file?.detail?.path);
			if (error) throw error;
			fileDownload(data, file?.detail?.path?.split("/").pop());
			setLoading(false);
			toast({
				title: "Berhasil Mengunduh Dokumen.",
				description: "Dokumen berhasil diunduh!",
				status: "success",
				position: "top",
				duration: 2000,
			});
		} catch (err) {
			setLoading(false);
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
					{file.nama}
				</Text>
				<FileCardMenu category={file?.kategori} file={file} />
			</CardHeader>
			<CardBody display='flex' flexDir='column' p={0} gap={2}>
				<Flex align='center' gap={2}>
					<Icon as={FileBadge} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
						File {file.kategori}
					</Text>
				</Flex>
				<Flex align='center' gap={2}>
					<Icon as={FileClock} fontSize='lg' color={iconFileColor} />
					<Text fontSize='sm' color={fontFileColor}>
						{useDate(file.uploadedAt)}
					</Text>
				</Flex>
			</CardBody>
			<CardFooter display='flex' flexDir='column' p={0}>
				<Button
					isLoading={loading}
					variant='outline'
					colorScheme='cyan'
					size={{ base: "sm", md: "md" }}
					leftIcon={<DownloadCloud size={18} />}
					onClick={onDownload}
				>
					Unduh Dokumen
				</Button>
			</CardFooter>
		</Card>
	);
}
