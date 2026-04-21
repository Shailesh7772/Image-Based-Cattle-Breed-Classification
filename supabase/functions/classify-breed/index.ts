import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CATTLE_BREEDS = [
  "Amritmahal","Bachaur","Bargur","Dangi","Deoni","Gaolao","Gir","Hallikar",
  "Hariana","Kangayam","Kankrej","Kasaragod Dwarf","Kherigarh","Khillari",
  "Krishna Valley","Malnad Gidda","Malvi","Mewati","Nagori","Nimari","Ongole",
  "Ponwar","Punganur","Rathi","Red Kandhari","Red Sindhi","Sahiwal","Siri",
  "Tharparkar","Umbalachery","Vechur","Belahi","Binjharpuri","Chhattisgarhi",
  "Dagri","Gangatiri","Himachali Pahari","Khamala","Lakhimi","Ladakhi","Motu",
  "Nari","Poda Thurpu","Pulikulam","Kosali","Thutho","Badri","Konkan Kapila",
  "Purnea","Shahabadi",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { image } = await req.json();
    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const breedList = CATTLE_BREEDS.join(", ");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content: `You are a world-class expert in Indian cattle breed identification with deep knowledge of all indigenous Indian cattle breeds. Given an image of cattle, identify the breed from ONLY this list: ${breedList}.

You MUST respond with ONLY valid JSON in this exact format, no other text:
{
  "predicted_breed": "BreedName",
  "confidence": 92.5,
  "top_predictions": [
    {"breed": "BreedName1", "confidence": 92.5},
    {"breed": "BreedName2", "confidence": 45.2},
    {"breed": "BreedName3", "confidence": 22.1},
    {"breed": "BreedName4", "confidence": 10.5},
    {"breed": "BreedName5", "confidence": 5.3}
  ]
}

Key distinguishing features to analyze carefully:
- Kangayam: Compact muscular body, short upward-curving horns, grey-white coat, strong legs
- Gir: Large body, curved horns, distinctive convex forehead, reddish-brown spots
- Sahiwal: Reddish-brown/dun color, loose skin, short horns, heavy build
- Ongole: Large white body, long horns, prominent hump, dewlap
- Tharparkar: White/grey, medium horns curving upward, well-proportioned body
- Hallikar: Grey, long backward-curving horns, compact body, prominent forehead
- Kankrej: Silver-grey to iron-grey, lyre-shaped horns, large body, high hump
- Red Sindhi: Deep red color, small curved horns, compact body
- Punganur: Very small/dwarf breed, white/grey/brown, short horns

Rules:
- predicted_breed MUST exactly match one name from the breed list
- Analyze horn shape, body color, body size, hump, dewlap, forehead shape carefully
- confidence values should be realistic percentages (0-100)
- top_predictions must have exactly 5 entries sorted by confidence descending
- If the image is not cattle, set predicted_breed to "Not a cattle" with confidence below 10`,
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: image },
              },
              {
                type: "text",
                text: "Identify this cattle breed. Return ONLY the JSON response.",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const body = await response.text();
      console.error("AI gateway error:", status, body);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway returned ${status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1];

    const parsed = JSON.parse(jsonStr.trim());
    const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);

    const result = {
      predicted_breed: parsed.predicted_breed,
      confidence: parsed.confidence,
      top_predictions: parsed.top_predictions?.slice(0, 5) ?? [],
      model_used: "Gemini 2.5 Flash (Vision)",
      processing_time: Number(processingTime),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("classify-breed error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Classification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
