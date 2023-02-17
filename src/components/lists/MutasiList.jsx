import { MutasiSelector } from "@/helpers/redux/slices/MutasiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { SimpleGrid } from "@chakra-ui/react";

// Components
import MutasiCard from "@/components/cards/MutasiCard";
import NoData from "@/components/others/NoData";

export default function MutasiList({ page, withMenu }) {
	const mutasi = useSelector(MutasiSelector.selectAll);

	return mutasi?.length > 0 ? (
		<SimpleGrid columns={1} spacing={6}>
			{mutasi.map((data, i) => (
				<MutasiCard key={i} mutasi={data} page={page} withMenu={withMenu} />
			))}
		</SimpleGrid>
	) : (
		<NoData page='Riwayat Mutasi' inProfile={page && page === "profil"} />
	);
}
