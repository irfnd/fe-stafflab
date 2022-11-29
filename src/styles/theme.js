import { extendTheme } from "@chakra-ui/react";

// Foundation Styles
import config from "@/styles/foundations/config";
import { fonts, fontWeights } from "@/styles/foundations/fonts";
import colors from "@/styles/foundations/colors";

const theme = extendTheme({
	colors,
	config,
	fonts,
	fontWeights,
});

export default theme;
