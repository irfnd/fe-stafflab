import { getGender } from "@/helpers/api/databases/chartData";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

// Styles & Icons
import { Flex, Heading, Skeleton, useColorModeValue } from "@chakra-ui/react";

// Chart Init
ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenderPegawaiChart() {
	const [chartData, setChartData] = useState();

	// Colormode
	const bgChart = useColorModeValue("white", "gray.800");
	const legendColor = useColorModeValue("#1A202C", "white");

	const fetchData = async () => {
		const results = await getGender();
		if (results) setChartData(results);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Flex direction='column' bg={bgChart} h='fit-content' w={{ md: "50%", lg: "full" }} p={8} gap={6} shadow='md' rounded='md'>
			<Skeleton isLoaded={chartData} rounded='md'>
				<Heading fontSize='lg' align='center' noOfLines={1}>
					Jenis Kelamin Pegawai
				</Heading>
			</Skeleton>

			<Skeleton isLoaded={chartData} h='full' rounded='md'>
				<Flex h={200} w='full' justify='center' align='center'>
					<Pie
						{...{
							data: {
								labels: ["Pria", "Wanita"],
								datasets: [
									{
										label: "Total",
										data: chartData,
										backgroundColor: ["#00B5D8", "#B83280"],
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
			</Skeleton>
		</Flex>
	);
}
