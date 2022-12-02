// Styles & Icons
import { FormControl, FormLabel, FormErrorMessage, Input } from "@chakra-ui/react";

export default function InputBase(props) {
	const { type = "text", name, label, placeholder } = props;

	return (
		<FormControl>
			{label && <FormLabel fontWeight="semibold">{label}</FormLabel>}
			<Input size="lg" {...{ type, placeholder }} focusBorderColor="cyan.500" />
			<FormErrorMessage>Email is required.</FormErrorMessage>
		</FormControl>
	);
}
