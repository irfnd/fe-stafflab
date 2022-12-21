// Styles & Icons
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { Edit, Save, X } from "lucide-react";

export default function EditButtonSection({ formHandler }) {
	const { formDisabled, setFormDisabled } = formHandler;

	if (formDisabled)
		return (
			<Button
				size='sm'
				colorScheme='cyan'
				variant='outline'
				leftIcon={<Edit size={18} />}
				w={{ base: "full", md: "fit-content" }}
				onClick={() => setFormDisabled(false)}
			>
				Edit
			</Button>
		);
	return (
		<Flex w={{ base: "full", md: "fit-content" }} justify='flex-end' gap={2}>
			<Button size='sm' colorScheme='cyan' leftIcon={<Save size={18} />} w={{ base: "full", md: "fit-content" }}>
				Simpan
			</Button>
			<IconButton size='sm' colorScheme='red' icon={<X size={24} />} onClick={() => setFormDisabled(true)} />
		</Flex>
	);
}
