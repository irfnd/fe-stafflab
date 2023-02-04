import { extendTheme } from "@chakra-ui/react";

// Foundation Styles
import config from "@/styles/foundations/config";
import { fonts, fontWeights } from "@/styles/foundations/fonts";

// Components
import Spinner from "@/styles/components/Spinner";

const theme = extendTheme({
	config,
	fonts,
	fontWeights,
	components: {
		Spinner,
	},
});

export default theme;
