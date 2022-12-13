import dropzone, { allowedFile } from "@/helpers/Dropzone";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

// Styles & Icons
import { Button, Flex, IconButton, Icon, Text, Image, useColorModeValue } from "@chakra-ui/react";
import { Upload, X, ImagePlus } from "lucide-react";

export default function InputPhoto({ name, label, file, h }) {
	const [SelectedFile, setSelectedFile] = useState(null);
	const [messages, setMessages] = useState(null);
	const fileExtensions = allowedFile[file].extensions.map((el) => el).join(", ");
	const fileMaxSize = allowedFile[file].maxSize;

	const { register, formState, setValue, getValues, clearErrors } = useFormContext();
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
			if (SelectedFile?.preview) URL.revokeObjectURL(SelectedFile.preview);
			setSelectedFile({ ...accepted[0], preview: URL.createObjectURL(accepted[0]) });
			setValue(name, accepted);
			clearErrors(name);
			setMessages(null);
		}
	};

	const onClear = () => {
		if (SelectedFile?.preview) URL.revokeObjectURL(SelectedFile.preview);
		setSelectedFile(null);
		setValue(name, null);
		setMessages(null);
	};

	const { getRootProps, getInputProps, open } = useDropzone(dropzone.options(onDrop, file));

	const bgFileInput = useColorModeValue("gray.100", "gray.800");
	const borderColorFileInput = useColorModeValue("gray.200", "whiteAlpha.300");
	const borderColorFileInputError = useColorModeValue("red.500", "red.300");
	const TextColorFileInput = useColorModeValue("gray.500", "whiteAlpha.300");
	const colorError = useColorModeValue("red.500", "red.300");

	return (
		<>
			{label && <Text fontWeight='semibold'>{label}</Text>}
			<Flex
				position='relative'
				direction='column'
				justify='center'
				align='center'
				h={h}
				bg={bgFileInput}
				borderWidth={messages || errors[name] ? 2 : 1}
				borderColor={messages || errors[name] ? borderColorFileInputError : borderColorFileInput}
				shadow='md'
				rounded='md'
				gap={4}
				{...getRootProps()}
			>
				<input type='hidden' name={formName} aria-label={formName} {...getInputProps()} />
				{SelectedFile && (
					<>
						<Image src={SelectedFile?.preview || SelectedFile} alt='Foto Profil' boxSize='full' objectFit='cover' rounded='md' />
						<IconButton
							position='absolute'
							top={2}
							right={2}
							colorScheme='red'
							w='fit-content'
							size='sm'
							icon={<X size={18} />}
							onClick={onClear}
						/>
					</>
				)}
				{!SelectedFile && (
					<Flex direction='column' justify='center' align='center' gap={2}>
						<Icon as={ImagePlus} fontSize={60} color={TextColorFileInput} />
						<Text color={TextColorFileInput} align='center' fontSize='sm' mb={2}>
							Tarik & taruh photo anda disini, <br />
							atau klik tombol Pilih
						</Text>
						<Button colorScheme='cyan' w='fit-content' size='sm' leftIcon={<Upload size={18} />} onClick={open}>
							Pilih
						</Button>
					</Flex>
				)}
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
		</>
	);
}
