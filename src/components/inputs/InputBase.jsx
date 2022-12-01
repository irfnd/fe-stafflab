// Styles & Icons
import { FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";

export default function InputBase(props) {
	const { type = "text", name, label, placeholder } = props;

	return (
		<FormControl>
			{label && <FormLabel fontWeight="semibold">{label}</FormLabel>}
			<Input size="lg" {...{ type, placeholder }} focusBorderColor="brand.blue.500" />
			<FormErrorMessage>Email is required.</FormErrorMessage>
		</FormControl>
	);
}
