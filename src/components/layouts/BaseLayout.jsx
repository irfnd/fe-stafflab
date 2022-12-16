import { Outlet, Navigate } from "react-router-dom";
import usePageTitle from "@/helpers/hooks/usePageTitle";

// Styles
import { Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";

// Components & Constants
import BaseNavbar from "@/components/layouts/navbars/BaseNavbar";
import BaseSidebar from "@/components/layouts/sidebars/BaseSidebars";
import BaseBreadcrumbs from "@/components/layouts/breadcrumbs/BaseBreadcrumbs";
import BaseFooter from "@/components/layouts/footers/BaseFooter";

export default function BaseLayout({ session }) {
	const disclosure = useDisclosure();
	const bgContent = useColorModeValue("gray.100", "gray.900");
	const colorBorder = useColorModeValue("gray.200", "transparent");

	if (!session) return <Navigate to='/login' />;
	return (
		<Flex direction='column' jusfity='space-between' minH='100vh' w='full'>
			<BaseSidebar disclosure={disclosure} />
			<BaseNavbar disclosure={disclosure} />
			<Flex direction='column' bg={bgContent} minH='100vh'>
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
					<BaseFooter />
				</Flex>
			</Flex>
		</Flex>
	);
}
