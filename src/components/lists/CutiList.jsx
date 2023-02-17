import { CutiSelector } from "@/helpers/redux/slices/CutiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import CutiCard from "@/components/cards/CutiCard";
import NoData from "@/components/others/NoData";

export default function CutiList({ page }) {
	const cuti = useSelector(CutiSelector.selectAll);

	return cuti?.filter((el) => el.diterima === true).length > 0 ? (
		<SimpleGrid columns={1} spacing={6}>
			{cuti
				.filter((el) => el.diterima === true)
				.map((data, i) => (
					<CutiCard key={i} cuti={data} page={page} />
				))}
		</SimpleGrid>
	) : (
		<NoData page='Riwayat Cuti' inProfile />
	);
}
