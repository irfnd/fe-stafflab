import { useFormContext } from "react-hook-form";
import { useState } from "react";

// Styles & Icons
import { FormControl, FormLabel, FormErrorMessage, InputGroup, Input, InputRightElement, IconButton, useColorModeValue } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword({ name, label, order, ...props }) {
	const { register, formState } = useFormContext();
	const { errors } = formState;

	const bgInput = useColorModeValue("white", "gray.800");

	const [ShowPass, setShowPass] = useState(false);

	return (
		<FormControl order={order} isInvalid={errors[name]}>
			{label && <FormLabel fontWeight='semibold'>{label}</FormLabel>}
			<InputGroup size='lg' bg={bgInput}>
				<Input type={ShowPass ? "text" : "password"} size='lg' focusBorderColor='cyan.500' {...props} {...register(name)} />
				<InputRightElement h='full' mr={1}>
					<IconButton
						variant='ghost'
						colorScheme='cyan'
						size='sm'
						icon={ShowPass ? <EyeOff size={18} /> : <Eye size={18} />}
						onClick={() => setShowPass(!ShowPass)}
					/>
				</InputRightElement>
			</InputGroup>
			{errors[name] && (
				<FormErrorMessage fontSize='sm' fontStyle='italic'>
					*{errors[name].message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
}
