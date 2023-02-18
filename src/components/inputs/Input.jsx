// Components
import InputBase from "@/components/inputs/InputBase";
import InputFile from "@/components/inputs/InputFile";
import InputNumber from "@/components/inputs/InputNumber";
import InputPassword from "@/components/inputs/InputPassword";
import InputPhoto from "@/components/inputs/InputPhoto";
import InputSelect from "@/components/inputs/InputSelect";
import InputTextarea from "@/components/inputs/InputTextarea";
import InputSwitch from "@/components/inputs/InputSwitch";

export default function Input({ type, ...props }) {
	switch (type) {
		case "password":
			return <InputPassword {...props} />;
		case "select":
			return <InputSelect {...props} />;
		case "file":
			return <InputFile {...props} />;
		case "photo":
			return <InputPhoto {...props} />;
		case "number":
			return <InputNumber {...props} />;
		case "textarea":
			return <InputTextarea {...props} />;
		case "switch":
			return <InputSwitch {...props} />;
		default:
			return <InputBase type={type} {...props} />;
	}
}
