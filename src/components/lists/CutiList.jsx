import { CutiSelector } from "@/helpers/redux/slices/CutiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import CutiCard from "@/components/cards/CutiCard";

export default function CutiList({ page }) {
	const cuti = useSelector(CutiSelector.selectAll);

	return (
		<SimpleGrid columns={1} spacing={6}>
			{cuti && cuti.filter((el) => el.diterima === true).map((data, i) => <CutiCard key={i} cuti={data} page={page} />)}
		</SimpleGrid>
	);
}
