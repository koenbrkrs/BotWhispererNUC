import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ZAPIER_WEBHOOK_URL = Deno.env.get('ZAPIER_WEBHOOK_URL');
    if (!ZAPIER_WEBHOOK_URL) {
      throw new Error('ZAPIER_WEBHOOK_URL is not configured');
    }

    const payload = await req.json();

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        topic: payload.topic,
        stance: payload.stance,
        friendly_aggressive: payload.friendlyAggressive,
        logical_illogical: payload.logicalIllogical,
        humor_serious: payload.humorSerious,
        sarcasm_direct: payload.sarcasmDirect,
        open_closed: payload.openClosed,
        minimal_verbose: payload.minimalVerbose,
        emoji_amount: payload.emojiAmount,
        bots_found: payload.botsFound,
        humans_misidentified: payload.humansMisidentified,
        total_bots: payload.totalBots,
        won: payload.won,
        score: payload.score,
        time_used: payload.timeUsed,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging game result:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
