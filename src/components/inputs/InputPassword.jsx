import { useState } from "react";

// Styles & Icons
import { FormControl, FormLabel, FormErrorMessage, InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword(props) {
	const { name, label, placeholder } = props;
	const [ShowPass, setShowPass] = useState(false);

	return (
		<FormControl>
			{label && <FormLabel fontWeight='semibold'>{label}</FormLabel>}
			<InputGroup>
				<Input type={ShowPass ? "text" : "password"} size='lg' {...{ placeholder }} focusBorderColor='cyan.500' />
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
			<FormErrorMessage>Email is required.</FormErrorMessage>
		</FormControl>
	);
}
