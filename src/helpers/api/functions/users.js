import Supabase from "@/helpers/Supabase";

const authorization = `Bearer ${import.meta.env.VITE_SUPABASE_ANON}`;
const contentType = "application/json";

export const createUser = async (newData) => {
	const { email, noTelepon } = newData;

	const { data, error } = await Supabase.functions.invoke("users", {
		headers: { authorization, "content-type": contentType },
		method: "POST",
		body: { email, phone: `+62${noTelepon}`, email_confirm: true, phone_confirm: true },
	});

	if (error) throw error;
	return data;
};

const userFunction = {
	createUser,
};

export default userFunction;
