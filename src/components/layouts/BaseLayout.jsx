import useDivisi from "@/helpers/hooks/useDivisi";
import useGolongan from "@/helpers/hooks/useGolongan";
import useInstansi from "@/helpers/hooks/useInstansi";
import useJabatan from "@/helpers/hooks/useJabatan";
import useStatusPegawai from "@/helpers/hooks/useStatusPegawai";
import { Navigate, Outlet } from "react-router-dom";

// Styles
import { Flex, Spacer, useColorModeValue, useDisclosure } from "@chakra-ui/react";

// Components & Constants
import BaseBreadcrumbs from "@/components/layouts/breadcrumbs/BaseBreadcrumbs";
import BaseFooter from "@/components/layouts/footers/BaseFooter";
import BaseNavbar from "@/components/layouts/navbars/BaseNavbar";
import BaseSidebar from "@/components/layouts/sidebars/BaseSidebars";

export default function BaseLayout({ session }) {
	const disclosure = useDisclosure();
	const bgContent = useColorModeValue("gray.100", "gray.900");
	const colorBorder = useColorModeValue("gray.200", "transparent");

	useStatusPegawai();
	useInstansi();
	useDivisi();
	useJabatan();
	useGolongan();

	if (!session) return <Navigate to='/login' />;
	return (
		<Flex direction='column' jusfity='space-between' minH='100vh' w='full'>
			<BaseSidebar disclosure={disclosure} />
			<BaseNavbar disclosure={disclosure} />
			<Flex direction='column' bg={bgContent} minH='100vh' w='full'>
				<Flex
					direction='column'
					borderLeftWidth={{ base: 0, md: 2 }}
					borderLeftColor={{ base: "transparent", lg: colorBorder }}
					ml={{ base: 0, lg: 80 }}
					mt={20}
					p={10}
					gap={10}
				>
					<BaseBreadcrumbs />
					<Outlet />
				</Flex>
				<Spacer />
				<BaseFooter />
			</Flex>
		</Flex>
	);
}
