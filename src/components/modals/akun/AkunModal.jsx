import { AkunResetPassword } from "@/helpers/Validations";
import { updateUser } from "@/helpers/api/functions/users";
import { PegawaiSelector } from "@/helpers/redux/slices/PegawaiSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Styles & Icons
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";

// Components
import AkunResetPasswordForm from "@/components/forms/AkunResetPasswordForm";

export default function AkunModal({ disclosure }) {
	const { isOpen, onClose } = disclosure;
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const pegawai = useSelector((state) => PegawaiSelector.selectById(state, params?.id));
	const resolver = yupResolver(AkunResetPassword);
	const mainForm = useForm({ resolver, mode: "onChange" });
	const toast = useToast();

	const onSubmit = async ({ password }) => {
		setLoading(true);
		try {
			const akun = await updateUser({ password }, pegawai?.uuidUser);
			setLoading(false);
			toast({
				title: "Berhasil Memperbarui Password Pegawai.",
				description: "Password telah diperbarui!",
				status: "success",
				position: "top",
				duration: 2000,
			});
			onClose();
			mainForm.reset();
		} catch (err) {
			setLoading(false);
			toast({
				title: "Gagal Memperbarui Password Pegawai.",
				description: err.message,
				status: "error",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const onCancel = () => {
		mainForm.reset();
		onClose();
	};

	return (
		<Modal size='lg' isOpen={isOpen} onClose={onCancel} isCentered>
			<ModalOverlay />
			<ModalContent p={4} mx={4}>
				<ModalHeader>Reset Password</ModalHeader>
				<ModalCloseButton size='lg' mt={4} mr={4} />
				<ModalBody>
					<FormProvider {...mainForm}>
						<form id='form-reset-password' onSubmit={mainForm.handleSubmit(onSubmit)}>
							<AkunResetPasswordForm />
						</form>
					</FormProvider>
				</ModalBody>

				<ModalFooter display='flex' gap={2}>
					<Button isLoading={loading} type='submit' form='form-reset-password' colorScheme='cyan'>
						Reset
					</Button>
					<Button colorScheme='red' variant='ghost' onClick={onCancel}>
						Batal
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
