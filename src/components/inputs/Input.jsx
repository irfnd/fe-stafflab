// Components
import InputBase from "@/components/inputs/InputBase";
import InputPassword from "@/components/inputs/InputPassword";
import InputSelect from "@/components/inputs/InputSelect";
import InputFile from "@/components/inputs/InputFile";
import InputPhoto from "@/components/inputs/InputPhoto";

export default function Input({ type, ...props }) {
	switch (type) {
		case "password":
			return <InputPassword type={type} {...props} />;
		case "select":
			return <InputSelect {...props} />;
		case "file":
			return <InputFile {...props} />;
		case "photo":
			return <InputPhoto {...props} />;
		default:
			return <InputBase type={type} {...props} />;
	}
}
