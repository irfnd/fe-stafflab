// Components
import InputBase from "@/components/inputs/InputBase";
import InputPassword from "@/components/inputs/InputPassword";

export default function Input({ type, ...props }) {
	switch (type) {
		case "password":
			return <InputPassword type={type} {...props} />;
		default:
			return <InputBase type={type} {...props} />;
	}
}
