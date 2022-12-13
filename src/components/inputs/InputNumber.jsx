import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

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

export default function InputNumber({ name, label, order, leftAddon, rightAddon, leftElement, rightElement, ...props }) {
	const { formState, control } = useFormContext();
	const { errors } = formState;

	const bgInput = useColorModeValue("white", "gray.800");

	return (
		<FormControl order={order} isInvalid={errors[name]}>
			{label && <FormLabel fontWeight='semibold'>{label}</FormLabel>}
			<Controller
				control={control}
				name={name}
				render={({ field }) =>
					leftAddon || rightAddon || leftElement || rightElement ? (
						<InputGroup size='lg' bg={bgInput}>
							{leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
							{leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
							<Input
								focusBorderColor='cyan.500'
								{...props}
								as={NumericFormat}
								value={field.value}
								onValueChange={({ value }) => field.onChange(value.replace(/[^\d]/, ""))}
								allowNegative={false}
							/>
							{rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
							{rightElement && <InputRightElement>{rightElement}</InputRightElement>}
						</InputGroup>
					) : (
						<Input
							focusBorderColor='cyan.500'
							{...props}
							as={NumericFormat}
							value={field.value}
							onValueChange={({ value }) => field.onChange(value.replace(/[^\d]/, ""))}
							allowNegative={false}
						/>
					)
				}
			/>
			{errors[name] && (
				<FormErrorMessage fontSize='sm' fontStyle='italic'>
					*{errors[name].message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
}
