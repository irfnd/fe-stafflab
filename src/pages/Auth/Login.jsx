// Styles & Icons
import { Text } from "@chakra-ui/react";

// Components
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
}
