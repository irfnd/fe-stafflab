import { getStatusPegawai } from "@/helpers/api/databases/chartData";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { StatusPegawaiSelector } from "@/helpers/redux/slices/StatusPegawaiSlice";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

// Chart Init
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatusPegawaiChart() {
	const [chartData, setChartData] = useState();
	const statusPegawai = useSelector(StatusPegawaiSelector.selectAll);

	// Colormode
	const bgChart = useColorModeValue("white", "gray.800");
	const legendColor = useColorModeValue("#1A202C", "white");

	const fetchData = async () => {
		const results = await getStatusPegawai();
		if (results) setChartData(results);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Flex direction='column' bg={bgChart} h='fit-content' w={{ md: "50%", lg: "full" }} py={8} px={6} gap={6} shadow='md' rounded='md'>
			<Heading fontSize='lg' align='center' noOfLines={1}>
				Status Pegawai
			</Heading>
			<Flex h={200} w='full' justify='center' align='center'>
				<Doughnut
					{...{
						data: {
							labels: statusPegawai?.map((status) => status.nama),
							datasets: [
								{
									label: "Total",
									data: chartData,
									backgroundColor: ["#38A169", "#00B5D8", "#B83280", "#E53E3E"],
									borderWidth: 0,
								},
							],
						},
						options: {
							plugins: {
								legend: {
									position: "bottom",
									labels: {
										font: { size: 14, family: "'Inter', sans-serif", weight: "600" },
										color: legendColor,
										usePointStyle: true,
										pointStyle: "circle",
										padding: 15,
									},
								},
								tooltip: {
									titleFont: { size: 14, family: "'Inter', sans-serif" },
									bodyFont: { size: 12, family: "'Inter', sans-serif" },
									padding: 10,
									usePointStyle: true,
									boxPadding: 5,
								},
							},
						},
					}}
				/>
			</Flex>
		</Flex>
	);
}
