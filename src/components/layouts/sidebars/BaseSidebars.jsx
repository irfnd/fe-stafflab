// Styles & Icons
import { Drawer, DrawerContent, useColorModeValue } from "@chakra-ui/react";

// Components
import SidebarContent from "@/components/layouts/sidebars/SidebarContent";

export default function BaseSidebar({ disclosure }) {
	const { isOpen, onClose } = disclosure;
	const bgSidebar = useColorModeValue("white", "gray.800");

	return (
		<>
			<SidebarContent onClose={onClose} display={{ base: "none", lg: "flex" }} bg={bgSidebar} />
			<Drawer isOpen={isOpen} onClose={onClose} placement="left" size={{ base: "full", md: "xs" }}>
				<DrawerContent>
					<SidebarContent onClose={onClose} bg={bgSidebar} />
				</DrawerContent>
			</Drawer>
		</>
	);
}
