import { DivisiSelector } from "@/helpers/redux/slices/DivisiSlice";
import { InstansiSelector } from "@/helpers/redux/slices/InstansiSlice";
import { JabatanSelector } from "@/helpers/redux/slices/JabatanSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

// Components & Constants
import Input from "@/components/inputs/Input";

export default function DetailMutasiForm() {
	const instansi = useSelector(InstansiSelector.selectAll);
	const divisi = useSelector(DivisiSelector.selectAll);
	const jabatan = useSelector(JabatanSelector.selectAll);

	const { watch, getValues, setValue } = useFormContext();

	const setSameValue = (fromForm, toForm) => setValue(toForm, getValues(fromForm));

	return (
		["Jabatan", "Instansi", "Divisi"].includes(watch("jenisMutasi")) && (
			<>
				<Flex direction={{ base: "column", md: "row" }} align='center' gap={{ base: 6, md: 2 }}>
					<Input
						type='select'
						name='fromInstansi'
						label='Instansi Asal'
						placeholder='Pilih Instansi Asal'
						options={instansi?.map((el) => ({ value: el.id, text: el.nama }))}
						shadow='md'
						rounded='md'
						disabled
					/>
					<IconButton
						icon={<ArrowRight />}
						size='lg'
						variant='ghost'
						colorScheme='cyan'
						mt={{ base: 0, md: 8 }}
						onClick={() => setSameValue("fromInstansi", "toInstansi")}
						disabled={watch("jenisMutasi") === "Instansi"}
						display={{ base: "none", md: "flex" }}
					/>
					<Input
						type='select'
						name='toInstansi'
						label='Instansi Tujuan'
						placeholder='Pilih Instansi Tujuan'
						options={
							watch("jenisMutasi") === "Instansi"
								? instansi?.filter((el) => el.id !== parseInt(watch("fromInstansi"), 10)).map((el) => ({ value: el.id, text: el.nama }))
								: instansi.map((el) => ({ value: el.id, text: el.nama }))
						}
						shadow='md'
						rounded='md'
					/>
				</Flex>

				<Flex direction={{ base: "column", md: "row" }} align='center' gap={{ base: 6, md: 2 }}>
					<Input
						type='select'
						name='fromDivisi'
						label='Divisi Asal'
						placeholder='Pilih Divisi Asal'
						options={divisi
							?.filter((el) => el.idInstansi === parseInt(watch("fromInstansi"), 10))
							.map((el) => ({ value: el.id, text: el.nama }))}
						shadow='md'
						rounded='md'
						disabled
					/>
					<IconButton
						icon={<ArrowRight />}
						size='lg'
						variant='ghost'
						colorScheme='cyan'
						mt={{ base: 0, md: 8 }}
						onClick={() => setSameValue("fromDivisi", "toDivisi")}
						disabled={watch("toInstansi") === ""}
						display={{ base: "none", md: "flex" }}
					/>
					<Input
						type='select'
						name='toDivisi'
						label='Divisi Tujuan'
						placeholder='Pilih Divisi Tujuan'
						options={
							watch("jenisMutasi") === "Divisi"
								? divisi
										?.filter((el) => el.idInstansi === parseInt(watch("toInstansi"), 10) && el.id !== parseInt(watch("fromDivisi"), 10))
										.map((el) => ({ value: el.id, text: el.nama }))
								: divisi?.filter((el) => el.idInstansi === parseInt(watch("toInstansi"), 10)).map((el) => ({ value: el.id, text: el.nama }))
						}
						shadow='md'
						rounded='md'
						disabled={watch("toInstansi") === ""}
					/>
				</Flex>

				<Flex direction={{ base: "column", md: "row" }} align='center' gap={{ base: 6, md: 2 }}>
					<Input
						type='select'
						name='fromJabatan'
						label='Jabatan Asal'
						placeholder='Pilih Jabatan Asal'
						options={jabatan
							?.filter((el) => el.idInstansi === parseInt(watch("fromInstansi"), 10) && el.idDivisi === parseInt(watch("fromDivisi"), 10))
							.map((el) => ({ value: el.id, text: el.nama }))}
						shadow='md'
						rounded='md'
						disabled
					/>
					<IconButton
						icon={<ArrowRight />}
						size='lg'
						variant='ghost'
						colorScheme='cyan'
						mt={{ base: 0, md: 8 }}
						onClick={() => setSameValue("fromJabatan", "toJabatan")}
						disabled={(watch("toInstansi") === "" || watch("toDivisi") === "") && true}
						display={{ base: "none", md: "flex" }}
					/>
					<Input
						type='select'
						name='toJabatan'
						label='Jabatan Tujuan'
						placeholder='Pilih Jabatan Tujuan'
						options={
							watch("jenisMutasi") === "Jabatan"
								? jabatan
										?.filter(
											(el) =>
												el.idInstansi === parseInt(watch("toInstansi"), 10) &&
												el.idDivisi === parseInt(watch("toDivisi"), 10) &&
												el.id !== parseInt(watch("fromJabatan"), 10)
										)
										.map((el) => ({ value: el.id, text: el.nama }))
								: jabatan
										?.filter((el) => el.idInstansi === parseInt(watch("toInstansi"), 10) && el.idDivisi === parseInt(watch("toDivisi"), 10))
										.map((el) => ({ value: el.id, text: el.nama }))
						}
						shadow='md'
						rounded='md'
						disabled={(watch("toInstansi") === "" || watch("toDivisi") === "") && true}
					/>
				</Flex>
			</>
		)
	);
}
