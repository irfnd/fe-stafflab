// Styles & Icons
import { CloseButton, Flex } from "@chakra-ui/react";

// Components & Constants
import BrandLogo from "@/components/layouts/navbars/BrandLogo";
import SidebarMenu from "@/components/layouts/sidebars/SidebarMenu";

export default function SidebarContent({ onClose, ...props }) {
	return (
		<Flex direction="column" pos="fixed" w={{ base: "full", lg: 80 }} h="full" zIndex={1101} {...props}>
			<Flex h={28} alignItems="center" mx="8" justifyContent="space-between">
				<BrandLogo />
				<CloseButton size="lg" variant="ghost" rounded="full" display={{ base: "flex", lg: "none" }} onClick={onClose} />
			</Flex>
			<SidebarMenu onClose={onClose} />
		</Flex>
	);
}
