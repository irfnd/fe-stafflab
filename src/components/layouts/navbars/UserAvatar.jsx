// Styles & Icons
import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { LogOut } from "lucide-react";

export default function UserAvatar() {
	const onLogout = () => {
		localStorage.clear();
		window.location.href = "/";
	};

	return (
		<Flex alignItems='center'>
			<Menu>
				<MenuButton transition='all 0.3s' _focus={{ boxShadow: "none" }}>
					<Flex align='center'>
						<Avatar size='sm' />
						<Flex direction='column' display={{ base: "none", md: "flex" }} alignItems='flex-start' ml='2'>
							<Text fontSize='sm'>Administrator</Text>
							<Text fontSize='xs' color='gray.600'>
								Admin
							</Text>
						</Flex>
					</Flex>
				</MenuButton>
				<MenuList>
					<MenuItem icon={<LogOut size={18} />} onClick={onLogout}>
						Log Out
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}
