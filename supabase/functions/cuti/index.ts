import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.4.0";

export const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
	"Access-Control-Allow-Methods": "*",
};

function checkDate(date: string) {
	const today = new Date().getTime();
	const iDate = new Date(date).getTime();
	return today > iDate;
}

async function getAllCuti(supabaseService: SupabaseClient) {
	const { data: cuti, error } = await supabaseService.from("cuti").select("*");
	if (error) throw error;
	return cuti;
}

async function updatePegawai(supabaseService: SupabaseClient, nip: number) {
	const { data: status } = await supabaseService.from("status_pegawai").select("*").eq("nama", "Aktif").single();
	const { data: pegawai, error } = await supabaseService.from("pegawai").update({ idStatus: status.id }).eq("nip", nip).select();
	if (error) throw error;
	return pegawai[0];
}

serve(async (req) => {
	if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
	if (req.method !== "GET") {
		return new Response(JSON.stringify({ error: "Method not allowed!" }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 405,
		});
	}

	try {
		const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
		const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
		const supabaseService = createClient(supabaseUrl, supabaseAnonKey);

		const allCuti = await getAllCuti(supabaseService);
		const results = await Promise.all(
			allCuti.map(async (cuti) => {
				if (checkDate(cuti.selesaiCuti)) {
					const pegawai = await updatePegawai(supabaseService, cuti.nipPegawai);
					return pegawai.nip;
				}
				return 0;
			})
		);

		return new Response(JSON.stringify({ results }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			headers: { ...corsHeaders, "Content-Type": "application/json" },
			status: 400,
		});
	}
});
