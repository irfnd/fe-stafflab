// Styles & Icons
import { Flex, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { Award, Building2, CalendarClock, Cog, FileBadge, Network, Pocket, Tags } from "lucide-react";

export default function MutasiTable({ mutasi, detailMutasi, dokumen }) {
	const dokumenId = mutasi?.dokumen?.files?.map((file) => file.id);

	const bgTable = useColorModeValue("white", "gray.800");
	const iconFileColor = useColorModeValue("cyan.500", "cyan.300");
	const fontFileColor = useColorModeValue("black", "whiteAlpha.700");

	return (
		<TableContainer w='full' bg={bgTable}>
			<Table variant='unstyled'>
				<Thead>
					<Tr>
						<Th style={{ paddingInlineStart: 0, paddingInlineEnd: 32 }} w='20%'>
							<Text casing='capitalize' fontSize='md' fontWeight='normal'>
								Keterangan Mutasi
							</Text>
						</Th>
						<Th style={{ paddingInlineStart: 0, paddingInlineEnd: 32 }}>
							<Text casing='capitalize' fontSize='md' fontWeight='normal'>
								Detail Mutasi
							</Text>
						</Th>
						<Th style={{ paddingInlineStart: 0, paddingInlineEnd: 32 }} w='20%'>
							<Text casing='capitalize' fontSize='md' fontWeight='normal'>
								Dokumen Mutasi
							</Text>
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td verticalAlign='top' style={{ paddingInlineStart: 0, paddingInlineEnd: 32 }}>
							<Flex direction='column' gap={2}>
								<Flex align='center' gap={2}>
									<Icon as={Cog} fontSize='lg' color={iconFileColor} />
									<Text fontSize='sm' casing='capitalize' color={fontFileColor}>
										Mutasi {mutasi?.jenisMutasi}
									</Text>
								</Flex>
								<Flex align='center' gap={2}>
									<Icon as={CalendarClock} fontSize='lg' color={iconFileColor} />
									<Text fontSize='sm' color={fontFileColor}>
										{mutasi?.tanggalMutasi}
									</Text>
								</Flex>
							</Flex>
						</Td>
						<Td style={{ paddingInlineStart: 0, paddingInlineEnd: 32 }}>
							<Flex direction='column' gap={2}>
								<Flex align='center' gap={2}>
									<Icon as={Tags} fontSize='lg' color={iconFileColor} />
									{detailMutasi?.fromTipe && detailMutasi?.toTipe && (
										<DynamicDetailMutasi from={detailMutasi?.fromTipe} to={detailMutasi?.toTipe} color={fontFileColor} />
									)}
								</Flex>
								<Flex align='center' gap={2}>
									<Icon as={FileBadge} fontSize='lg' color={iconFileColor} />
									{detailMutasi?.fromStatus && detailMutasi?.toStatus && (
										<DynamicDetailMutasi from={detailMutasi?.fromStatus} to={detailMutasi?.toStatus} color={fontFileColor} />
									)}
								</Flex>
								<Flex align='center' gap={2}>
									<Icon as={Building2} fontSize='lg' color={iconFileColor} />
									{detailMutasi?.fromInstansi && detailMutasi?.toInstansi && (
										<DynamicDetailMutasi from={detailMutasi?.fromInstansi} to={detailMutasi?.toInstansi} color={fontFileColor} />
									)}
								</Flex>
								<Flex align='center' gap={2}>
									<Icon as={Network} fontSize='lg' color={iconFileColor} />
									{detailMutasi?.fromDivisi && detailMutasi?.toDivisi && (
										<DynamicDetailMutasi from={detailMutasi?.fromDivisi} to={detailMutasi?.toDivisi} color={fontFileColor} />
									)}
								</Flex>
								<Flex align='center' gap={2}>
									<Icon as={Award} fontSize='lg' color={iconFileColor} />
									{detailMutasi?.fromJabatan && detailMutasi?.toJabatan && (
										<DynamicDetailMutasi from={detailMutasi?.fromJabatan} to={detailMutasi?.toJabatan} color={fontFileColor} />
									)}
								</Flex>
								<Flex align='center' gap={2}>
									<Icon as={Pocket} fontSize='lg' color={iconFileColor} />
									{detailMutasi?.fromGolongan && detailMutasi?.toGolongan && (
										<DynamicDetailMutasi from={detailMutasi?.fromGolongan} to={detailMutasi?.toGolongan} color={fontFileColor} />
									)}
								</Flex>
							</Flex>
						</Td>
						<Td>
							<Flex direction='column' gap={2}>
								{JSON.stringify(dokumen?.filter((el) => dokumenId.includes(el.id)).map((el) => el.detail))}
							</Flex>
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
}

function DynamicDetailMutasi({ from, to, color }) {
	if (from !== to)
		return (
			<Text fontSize='sm' casing='capitalize' color={color}>
				{from?.nama} &rarr; {to?.nama}
			</Text>
		);
	return (
		<Text fontSize='sm' casing='capitalize' color={color}>
			{from?.nama}
		</Text>
	);
}
