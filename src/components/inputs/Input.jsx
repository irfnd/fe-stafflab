// Components
import InputBase from "@/components/inputs/InputBase";
import InputFile from "@/components/inputs/InputFile";
import InputNumber from "@/components/inputs/InputNumber";
import InputPassword from "@/components/inputs/InputPassword";
import InputPhoto from "@/components/inputs/InputPhoto";
import InputSelect from "@/components/inputs/InputSelect";

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
		case "number":
			return <InputNumber {...props} />;
		default:
			return <InputBase type={type} {...props} />;
	}
}
