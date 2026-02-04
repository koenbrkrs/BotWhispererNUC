import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BotConfig {
  friendlyAggressive: number;
  logicalIllogical: number;
  humorSerious: number;
  sarcasmDirect: number;
  openClosed: number;
  minimalVerbose: number;
  emojiAmount: number;
  topic: string;
  stance: string;
}

interface GenerateRequest {
  config: BotConfig;
  platform: 'youtube' | 'twitter' | 'whatsapp';
  type: 'bot' | 'human';
}

const getPlatformContext = (platform: string): string => {
  switch (platform) {
    case 'youtube':
      return 'RoboTube video comments section';
    case 'twitter':
      return 'Botter replies and quote posts';
    case 'whatsapp':
      return 'Botsapp group chat messages';
    default:
      return 'social media';
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { config, platform, type } = await req.json() as GenerateRequest;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const platformContext = getPlatformContext(platform);
    
    // For humans, flip the personality sliders to create contrast
    const friendly = type === 'bot' ? config.friendlyAggressive : 100 - config.friendlyAggressive;
    const aggressive = type === 'bot' ? 100 - config.friendlyAggressive : config.friendlyAggressive;
    const logical = type === 'bot' ? config.logicalIllogical : 100 - config.logicalIllogical;
    const illogical = type === 'bot' ? 100 - config.logicalIllogical : config.logicalIllogical;
    const humor = type === 'bot' ? config.humorSerious : 100 - config.humorSerious;
    const serious = type === 'bot' ? 100 - config.humorSerious : config.humorSerious;
    const sarcasm = type === 'bot' ? config.sarcasmDirect : 100 - config.sarcasmDirect;
    const direct = type === 'bot' ? 100 - config.sarcasmDirect : config.sarcasmDirect;
    const open = type === 'bot' ? config.openClosed : 100 - config.openClosed;
    const closed = type === 'bot' ? 100 - config.openClosed : config.openClosed;
    const minimal = type === 'bot' ? config.minimalVerbose : 100 - config.minimalVerbose;
    const verbose = type === 'bot' ? 100 - config.minimalVerbose : config.minimalVerbose;
    const emoji = type === 'bot' ? config.emojiAmount : Math.max(10, 100 - config.emojiAmount);

    const stanceInstruction = type === 'bot' 
      ? `Your stance is: ${config.stance}.`
      : `You have varied opinions on this topic - some agree, some disagree, some are neutral. Mix it up naturally.`;

    const prompt = `You are a highly realistic social media user commenting on the topic: '${config.topic}'.

${stanceInstruction}

Personality settings (0-100%):
Friendly: ${friendly}%, Aggressive: ${aggressive}%, Logical: ${logical}%, Illogical: ${illogical}%,
Humor: ${humor}%, Serious: ${serious}%, Sarcasm: ${sarcasm}%, Direct: ${direct}%,
Open: ${open}%, Closed: ${closed}%, Minimal: ${minimal}%, Verbose: ${verbose}%, Emoji usage: ${emoji}%.

Write 10 short, natural comments (maximum 30 words each) that a real person with this exact personality would post on ${platformContext}.

Make them sound human but influenced by the sliders. Vary tone, length, emojis, and logic according to the percentages.
${type === 'human' ? 'Include some typos, casual language, abbreviations like "tbh", "idk", "ngl", "lol" occasionally.' : ''}
Do not number them, just output one comment per line. No empty lines between comments.`;

    console.log(`Generating ${type} comments for ${platform}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { 
            role: "system", 
            content: "You are a comment generator. Output ONLY the comments, one per line. No numbering, no extra text, no explanations. Just 10 lines of realistic social media comments." 
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the 10 comments (one per line)
    const comments = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0 && line.length < 200)
      .slice(0, 10);

    console.log(`Generated ${comments.length} ${type} comments for ${platform}`);

    return new Response(JSON.stringify({ comments }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("generate-comments error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
