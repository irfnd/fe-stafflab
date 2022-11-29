import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Styles & Icons
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Flex,
	Icon,
	Link,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

// Components & Constants
import { SIDEBARS } from "@/constants/Routes";

export default function SidebarMenu({ onClose }) {
	const [NestedOpen, setNestedOpen] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();
	const activeLink = useColorModeValue("brand.blue.300", "brand.blue.500");
	const activeNestedLink = useColorModeValue("gray.100", "gray.700");
	const sidebarMenu = Object.values(SIDEBARS);

	useEffect(() => {
		const getNestedMenu = sidebarMenu.map((el, index) => ({ index, ...{ ...(el.children ? el : null) } })).filter((el) => el.path);
		const getIndex = getNestedMenu.map((el) => location.pathname.includes(el.path) && el.index)[0];
		setNestedOpen(getIndex ? [getIndex] : []);
	}, [location]);

	return (
		<Accordion
			display="flex"
			flexDirection="column"
			px={6}
			gap={2}
			mt={4}
			allowToggle
			index={NestedOpen}
			onChange={(index) => setNestedOpen(index)}
		>
			{sidebarMenu.map((menu, i) => (
				<AccordionItem bg={activeNestedLink} rounded="md" border="none" key={i}>
					<AccordionButton
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						transition="0.5s ease"
						rounded="md"
						py={4}
						px={6}
						bg={location.pathname === menu.path || (menu.children && location.pathname.includes(menu.path)) ? activeLink : "transparent"}
						_hover={{ bg: activeLink }}
						_expanded={{ bg: menu.children && activeNestedLink }}
						onClick={() => {
							if (!menu.children) {
								navigate(menu.path);
								onClose();
							}
						}}
					>
						<Flex alignItems="center" gap={4}>
							<Icon as={menu.icon} fontSize={22} />
							<Text>{menu.name}</Text>
						</Flex>
						{menu.children && <AccordionIcon />}
					</AccordionButton>
					{menu.children && (
						<AccordionPanel display="flex" flexDir="column" p={2} gap={1}>
							{menu.children.map((child, j) => (
								<Link as={NavLink} to={child.path} key={j} _hover={{ textDecor: "none" }} w="full" onClick={onClose}>
									<Flex
										bg={
											child.isIndex
												? (menu.path === location.pathname && activeLink) || (child.path === location.pathname && activeLink)
												: child.path === location.pathname && activeLink
										}
										transition="0.5s ease"
										align="center"
										rounded="md"
										gap={4}
										py={4}
										px={6}
										_hover={{ bg: activeLink }}
									>
										<Icon as={child.icon} fontSize={20} />
										<Text>{child.name}</Text>
									</Flex>
								</Link>
							))}
						</AccordionPanel>
					)}
				</AccordionItem>
			))}
		</Accordion>
	);
}
