// Styles & Icons
import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { Menu } from "lucide-react";

// Components
import ToggleTheme from "@/components/layouts/navbars/ToggleTheme";
import UserAvatar from "@/components/layouts/navbars/UserAvatar";

export default function BaseNavbar({ disclosure }) {
	const { onOpen } = disclosure;
	const bgNavbar = useColorModeValue("white", "gray.800");
	const colorBorder = useColorModeValue("gray.200", "transparent");

	return (
		<Flex
			pos='fixed'
			zIndex={1100}
			align='center'
			justify={{ base: "space-between", lg: "flex-end" }}
			bg={bgNavbar}
			borderBottomWidth={2}
			borderBottomColor={colorBorder}
			px={{ base: 7, md: 10 }}
			h={20}
			w='full'
		>
			<IconButton size='lg' display={{ base: "flex", lg: "none" }} onClick={onOpen} variant='ghost' rounded='full' icon={<Menu size={28} />} />
			<Flex gap={{ base: 2, md: 4 }}>
				<ToggleTheme />
				<UserAvatar />
			</Flex>
		</Flex>
	);
}
