// Styles & Icons
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { Edit, Save, X } from "lucide-react";

export default function EditButtonSection({ formHandler }) {
	const { formDisabled, setFormDisabled } = formHandler;

	if (formDisabled)
		return (
			<Button size='sm' colorScheme='cyan' variant='outline' leftIcon={<Edit size={18} />} onClick={() => setFormDisabled(false)}>
				Edit
			</Button>
		);
	return (
		<Flex justify='flex-end' gap={2}>
			<Button size='sm' colorScheme='cyan' leftIcon={<Save size={18} />}>
				Simpan
			</Button>
			<IconButton size='sm' colorScheme='red' icon={<X size={24} />} onClick={() => setFormDisabled(true)} />
		</Flex>
	);
}
