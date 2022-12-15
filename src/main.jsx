import ReactDOM from "react-dom/client";

// Main Components, Styles, Fonts
import App from "@/App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/styles/theme";
import "@fontsource/inter";
import "@fontsource/share-tech-mono";

// Redux Toolkit
import { Provider } from "react-redux";
import store from "@/helpers/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider theme={theme}>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<Provider store={store}>
			<App />
		</Provider>
	</ChakraProvider>
);
