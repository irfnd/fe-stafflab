import { useState } from "react";
import Chart from "react-apexcharts";

// Styles & Icons
import { Text, Flex } from "@chakra-ui/react";

export default function GenderPegawaiChart() {
	const [Series, setSeries] = useState([100, 20]);

	return (
		<Flex bg='gray.800' p={4} rounded='md'>
			<Chart
				options={{
					labels: ["Laki-laki", "Perempuan"],
					colors: ["#3182CE", "#00A3C4"],
					dataLabels: { style: { colors: ["#fff"] } },
					legend: { labels: { colors: "#fff" } },
				}}
				series={Series}
				type='pie'
			/>
		</Flex>
	);
}
