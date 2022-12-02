import { extendTheme } from "@chakra-ui/react";

// Foundation Styles
import config from "@/styles/foundations/config";
import { fonts, fontWeights } from "@/styles/foundations/fonts";

// Components

const theme = extendTheme({
	config,
	fonts,
	fontWeights,
});

export default theme;
