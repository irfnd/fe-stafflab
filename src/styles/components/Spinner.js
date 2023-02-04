import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const loading = {
	variant: defineStyle({
		borderWidth: 6,
	}),
	size: defineStyle({
		height: 120,
		width: 120,
	}),
};

const Spinner = defineStyleConfig({
	sizes: { loading: loading.size },
	variants: { loading: loading.variant },
});

export default Spinner;
