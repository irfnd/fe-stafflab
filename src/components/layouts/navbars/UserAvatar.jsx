// Styles & Icons
import { Avatar, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";

export default function UserAvatar() {
	return (
		<Flex alignItems='center'>
			<Menu>
				<MenuButton transition='all 0.3s' _focus={{ boxShadow: "none" }}>
					<Flex align='center'>
						<Avatar size='sm' />
						<Flex direction='column' display={{ base: "none", md: "flex" }} alignItems='flex-start' ml='2'>
							<Text fontSize='sm'>Justina Clark</Text>
							<Text fontSize='xs' color='gray.600'>
								Admin
							</Text>
						</Flex>
					</Flex>
				</MenuButton>
				<MenuList>
					<MenuItem>Profile</MenuItem>
					<MenuItem>Settings</MenuItem>
					<MenuItem>Billing</MenuItem>
					<MenuDivider />
					<MenuItem>Sign out</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}