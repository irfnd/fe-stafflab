import { getTotalPegawai } from "@/helpers/api/databases/chartData";
import { TipePegawaiSelector } from "@/helpers/redux/slices/TipePegawaiSlice";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Styles & Icons
import { Flex, Heading, Skeleton, useColorModeValue } from "@chakra-ui/react";

// Chart Init
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TotalPegawaiChart() {
	const [chartData, setChartData] = useState();
	const tipePegawai = useSelector(TipePegawaiSelector.selectAll);

	// Colormode
	const bgChart = useColorModeValue("white", "gray.800");
	const labelsColor = useColorModeValue("#1A202C", "white");
	const gridColor = useColorModeValue("#E2E8F0", "#2D3748");

	const fetchData = async () => {
		const results = await getTotalPegawai();
		if (results) setChartData(results);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Flex direction='column' bg={bgChart} w={{ base: "full", lg: "70%" }} p={8} gap={6} shadow='md' rounded='md'>
			<Skeleton isLoaded={chartData && tipePegawai} rounded='md'>
				<Heading fontSize='lg' align='center' noOfLines={1}>
					Jumlah Pegawai
				</Heading>
			</Skeleton>

			<Skeleton isLoaded={chartData && tipePegawai} h='full' rounded='md'>
				<Flex h={{ base: 200, md: 300, lg: 500 }} w='full' justify='center' align='center'>
					<Bar
						{...{
							data: {
								labels: tipePegawai?.map((tipe) => tipe.nama),
								datasets: [{ label: "Total", data: chartData, backgroundColor: ["#38A169", "#00B5D8", "#B83280"], borderWidth: 0 }],
							},
							options: {
								plugins: {
									legend: { display: false },
									tooltip: {
										titleFont: { size: 14, family: "'Inter', sans-serif" },
										bodyFont: { size: 12, family: "'Inter', sans-serif" },
										padding: 10,
										usePointStyle: true,
										boxPadding: 5,
									},
								},
								scales: {
									x: { grid: { color: gridColor }, ticks: { color: labelsColor, font: { weight: "600", size: 14 } } },
									y: { grid: { color: gridColor }, ticks: { color: labelsColor, font: { weight: "600", size: 14 } } },
								},
							},
						}}
					/>
				</Flex>
			</Skeleton>
		</Flex>
	);
}
