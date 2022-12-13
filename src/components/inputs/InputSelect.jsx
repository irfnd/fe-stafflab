import { useFormContext } from "react-hook-form";

// Styles & Icons
import { FormControl, FormErrorMessage, FormLabel, Select, useColorModeValue } from "@chakra-ui/react";

export default function InputSelect({ name, label, options, order, ...props }) {
	const { register, formState } = useFormContext();
	const { errors } = formState;

	const bgInput = useColorModeValue("white", "gray.800");

	return (
		<FormControl order={order} isInvalid={errors[name]}>
			{label && <FormLabel fontWeight='semibold'>{label}</FormLabel>}
			<Select size='lg' focusBorderColor='cyan.500' {...props} bg={bgInput} {...register(name)}>
				{options.map((option, i) => (
					<option key={i} value={option.value}>
						{option.text}
					</option>
				))}
			</Select>
			{errors[name] && (
				<FormErrorMessage fontSize='sm' fontStyle='italic'>
					*{errors[name].message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
}
