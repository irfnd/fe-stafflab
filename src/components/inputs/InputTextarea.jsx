import { useFormContext } from "react-hook-form";

// Styles & Icons
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	InputRightAddon,
	InputRightElement,
	Textarea,
	useColorModeValue,
} from "@chakra-ui/react";

export default function InputTextarea({ name, label, order, leftAddon, rightAddon, leftElement, rightElement, ...props }) {
	const { register, formState } = useFormContext();
	const { errors } = formState;

	const bgInput = useColorModeValue("white", "gray.800");

	return (
		<FormControl order={order} isInvalid={errors[name]}>
			{label && <FormLabel fontWeight='semibold'>{label}</FormLabel>}
			{leftAddon || leftElement || rightAddon || rightElement ? (
				<InputGroup size='lg' bg={bgInput} rounded={props.rounded} shadow={props.shadow}>
					{leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
					{leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
					<Textarea focusBorderColor='cyan.500' {...props} {...register(name)} />
					{rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
					{rightElement && <InputRightElement>{rightElement}</InputRightElement>}
				</InputGroup>
			) : (
				<Textarea size='lg' focusBorderColor='cyan.500' bg={bgInput} {...props} {...register(name)} />
			)}
			{errors[name] && (
				<FormErrorMessage fontSize='sm' fontStyle='italic'>
					*{errors[name].message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
}
