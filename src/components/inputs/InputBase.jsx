import { useFormContext } from "react-hook-form";

// Styles & Icons
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	InputLeftElement,
	InputRightElement,
	useColorModeValue,
} from "@chakra-ui/react";

export default function InputBase({ type = "text", name, label, order, leftAddon, rightAddon, leftElement, rightElement, ...props }) {
	const { register, formState } = useFormContext();
	const { errors } = formState;

	const bgInput = useColorModeValue("white", "gray.800");

	return (
		<FormControl order={order} isInvalid={errors[name]}>
			{label && <FormLabel fontWeight='semibold'>{label}</FormLabel>}
			<InputGroup size='lg' bg={bgInput}>
				{leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
				{leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
				<Input type={type} focusBorderColor='cyan.500' {...props} {...register(name)} />
				{rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
				{rightElement && <InputRightElement>{rightElement}</InputRightElement>}
			</InputGroup>
			{errors[name] && <FormErrorMessage>*{errors[name].message}</FormErrorMessage>}
		</FormControl>
	);
}
