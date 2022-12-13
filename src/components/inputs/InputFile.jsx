import dropzone, { allowedFile } from "@/helpers/Dropzone";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

// Styles & Icons
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { Upload, X } from "lucide-react";

export default function InputFile({ name, label, order, file }) {
	const [SelectedFile, setSelectedFile] = useState(null);
	const [messages, setMessages] = useState(null);
	const fileExtensions = allowedFile[file].extensions.map((el) => el).join(", ");
	const fileMaxSize = allowedFile[file].maxSize;

	const { register, formState, setValue, getValues } = useFormContext();
	const { formName } = register(name);
	const { errors } = formState;

	const onDrop = (accepted, rejected) => {
		if (rejected.length > 0) {
			const customError = rejected[0].errors.map(({ code }) => {
				const error = {};
				if (code) {
					if (code === "file-invalid-type") error.message = `File harus berekstensi ${fileExtensions}`;
					if (code === "file-too-large") error.message = `File harus tidak lebih dari ${fileMaxSize}`;
					return error;
				}
				return null;
			});
			setMessages(customError);
		} else {
			setSelectedFile({ ...accepted[0], preview: URL.createObjectURL(accepted[0]) });
			setValue(name, accepted[0]);
			setMessages(null);
		}
	};

	const onClear = () => {
		setSelectedFile(null);
		setValue(name, null);
		setMessages(null);
	};

	const { getRootProps, getInputProps, open } = useDropzone(dropzone.options(onDrop, file));

	const bgFileInput = useColorModeValue("gray.100", "gray.800");
	const borderColorFileInput = useColorModeValue("gray.200", "whiteAlpha.300");
	const TextColorFileInput = useColorModeValue("gray.500", "whiteAlpha.300");
	const colorError = useColorModeValue("red.500", "red.300");

	return (
		<Flex direction='column' w='full' order={order} gap={2}>
			{label && <Text fontWeight='semibold'>{label}</Text>}
			<Flex
				justify='space-between'
				align='center'
				w='full'
				h={12}
				bg={bgFileInput}
				borderWidth={1}
				borderColor={borderColorFileInput}
				shadow='md'
				rounded='md'
				paddingInlineStart={4}
				paddingInlineEnd={2}
				{...getRootProps()}
			>
				<input type='hidden' name={formName} aria-label={formName} {...getInputProps()} />
				<Flex justify='space-between' align='center' w='full'>
					{!SelectedFile && (
						<Text noOfLines={1} color={TextColorFileInput} fontSize='lg'>
							Belum ada file
						</Text>
					)}
					{SelectedFile && (
						<Text noOfLines={1} maxW='60%'>
							{SelectedFile.path}
						</Text>
					)}
					{SelectedFile && <IconButton colorScheme='red' w='fit-content' size='sm' icon={<X size={18} />} onClick={onClear} />}
					{!SelectedFile && <IconButton colorScheme='cyan' size='sm' icon={<Upload size={18} />} onClick={open} />}
				</Flex>
			</Flex>
			{(messages || errors[name]) && (
				<Flex direction='column'>
					{errors[name] && (
						<Text fontSize='sm' fontStyle='italic' color={colorError}>
							*{errors[name].message}
						</Text>
					)}
					{messages &&
						messages.map((el, i) => (
							<Text key={i} fontSize='sm' fontStyle='italic' color={colorError}>
								*{el.message}
							</Text>
						))}
				</Flex>
			)}
		</Flex>
	);
}
