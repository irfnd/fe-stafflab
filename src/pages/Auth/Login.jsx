import { Navigate } from "react-router-dom";

// Styles & Icons

// Components
import LoginForm from "@/components/forms/LoginForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function Login({ session }) {
	if (session) return <Navigate to='/' />;
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
}
