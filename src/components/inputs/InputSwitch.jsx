// Styles & Icons
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";

export default function InputSwitch({ label, value, onChange }) {
	return (
		<FormControl
			display='flex'
			flexDirection={{ base: "column", md: "row" }}
			align={{ base: "start", md: "center" }}
			w='fit-content'
			gap={2}
		>
			{label && (
				<FormLabel htmlFor='switch' fontWeight='semibold' cursor='pointer' m={0}>
					{label}
				</FormLabel>
			)}
			<Switch id='switch' size='lg' colorScheme='cyan' value={value} onChange={onChange} />
		</FormControl>
	);
}
