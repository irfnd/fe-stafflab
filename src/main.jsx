import ReactDOM from "react-dom/client";

// Main Components, Styles, Fonts
import App from "@/App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/styles/theme";
import "@fontsource/inter";
import "@fontsource/share-tech-mono";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider theme={theme}>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</ChakraProvider>
);
