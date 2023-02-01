import axios from "axios";

const authorization = `Bearer ${import.meta.env.VITE_SUPABASE_ANON}`;

const api = axios.create({
	baseURL: import.meta.env.VITE_SUPABASE_FUNCTION,
	headers: { authorization, "content-type": "application/json" },
});

export const createUser = async (newData) => {
	const { email, noTelepon } = newData;
	const data = JSON.stringify({ email, phone: `+62${noTelepon}`, email_confirm: true, phone_confirm: true });
	const results = await api.post("users", data);
	return results.data.user;
};

export const updateUser = async (newData, uuid) => {
	const data = JSON.stringify(newData);
	const results = await api.put(`users/${uuid}`, data);
	return results.data.user;
};

export const deleteUser = async (uuid) => {
	await api.delete(`users/${uuid}`);
	return true;
};

export default {
	createUser,
	updateUser,
	deleteUser,
};
