import Supabase from "@/helpers/Supabase";

export const setClaims = async ({ claim, value, uid }) => {
	const { data, error } = await Supabase.rpc("set_claim", { claim, uid, value });
	if (error) throw error;
	return data;
};

export const deleteClaims = async ({ claim, uid }) => {
	const { data, error } = await Supabase.rpc("delete_claim", { claim, uid });
	if (error) throw error;
	return data;
};

export default {
	setClaims,
	deleteClaims,
};
