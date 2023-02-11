// Styles & Icons
import { IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
	const { colorMode, toggleColorMode } = useColorMode();
	const iconTheme = colorMode === "light" ? <Moon size={28} /> : <Sun size={28} />;

	return <IconButton aria-label='toggle-theme' size='lg' icon={iconTheme} variant='ghost' rounded='full' onClick={toggleColorMode} />;
}
