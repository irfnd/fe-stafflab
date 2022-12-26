// Styles & Icons
import { Flex } from "@chakra-ui/react";

// Components & Constants
import Input from "@/components/inputs/Input";
import { JenjangPendidikan } from "@/constants/InputProps";

export default function PendidikanForm({ value }) {
	const { ijazah, transkrip } = value;

	return (
		<Flex direction='column' w='full' gap={4}>
			<Input
				type='select'
				name='jenjang'
				label='Jenjang Pendidikan'
				placeholder='Pilih Jenjang Pendidikan'
				options={JenjangPendidikan}
				shadow='md'
				rounded='md'
			/>
			<Input name='nama' label='Nama Instansi Pendidikan' placeholder='Masukan Nama Instansi Pendidikan' shadow='md' rounded='md' />
			<Input name='jurusan' label='Jurusan' placeholder='Masukan Jurusan' shadow='md' rounded='md' />
			<Input type='number' name='tahunMasuk' label='Tahun Masuk' placeholder='Masukan Tahun Masuk' shadow='md' rounded='md' />
			<Input type='number' name='tahunLulus' label='Tahun Lulus' placeholder='Masukan Tahun Lulus' shadow='md' rounded='md' />
			<Input name='gelar' label='Gelar Akademis' placeholder='Masukan Gelar Akademis' shadow='md' rounded='md' />
			<Input type='file' name='ijazah' label='Ijazah' file='docs' value={ijazah} />
			<Input type='file' name='transkrip' label='Transkrip Nilai' file='docs' value={transkrip} />
		</Flex>
	);
}
