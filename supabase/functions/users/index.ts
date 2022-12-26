import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

export const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
	"Access-Control-Allow-Methods": "*",
};

interface users {
	email: string;
	phone: string;
	email_confirm: boolean;
	phone_confirm: boolean;
	password: string;
}

async function createUser(supabaseService: SupabaseClient, userData: users) {
	const { data: user, error } = await supabaseService.auth.admin.createUser(userData);
	if (error) throw error;

	return new Response(JSON.stringify(user), {
		headers: { ...corsHeaders, "Content-Type": "application/json" },
		status: 200,
	});
}

async function getAllUsers(supabaseService: SupabaseClient) {
	const { data, error } = await supabaseService.auth.admin.listUsers();
	const { users } = data;
	if (error) throw error;

	return new Response(JSON.stringify({ users }), {
		headers: { ...corsHeaders, "Content-Type": "application/json" },
		status: 200,
	});
}

async function getUser(supabaseService: SupabaseClient, id: string) {
	const { data: user, error } = await supabaseService.auth.admin.getUserById(id);
	if (error) throw error;

	return new Response(JSON.stringify({ user }), {
		headers: { ...corsHeaders, "Content-Type": "application/json" },
		status: 200,
	});
}

async function updateUser(supabaseService: SupabaseClient, id: string, userData: users) {
	const { data: user, error } = await supabaseService.auth.admin.updateUserById(id, userData);
	if (error) throw error;

	return new Response(JSON.stringify(user), {
		headers: { ...corsHeaders, "Content-Type": "application/json" },
		status: 200,
	});
}

async function deleteUser(supabaseService: SupabaseClient, id: string) {
	const { error } = await supabaseService.auth.admin.deleteUser(id);
	if (error) throw error;

	return new Response(JSON.stringify({}), {
		headers: { ...corsHeaders, "Content-Type": "application/json" },
		status: 200,
	});
}

serve(async (req) => {
	const { url, method } = req;
	if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

	try {
		const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
		const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
		const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

		const userPattern = new URLPattern({ pathname: "/users/:id" });
		const matchingPath = userPattern.exec(url);
		const id = matchingPath ? matchingPath.pathname.groups.id : null;

		let userData = null;
		if (method === "POST" || method === "PUT") {
			const body = await req.json();
			userData = { ...body };
		}

		switch (true) {
			case id && method === "GET":
				return getUser(supabaseService, id as string);
			case id && method === "PUT":
				return updateUser(supabaseService, id as string, userData);
			case id && method === "DELETE":
				return deleteUser(supabaseService, id as string);
			case method === "POST":
				return createUser(supabaseService, userData);
			case method === "GET":
				return getAllUsers(supabaseService);
			default:
				return getAllUsers(supabaseService);
		}
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 400,
		});
	}
});
