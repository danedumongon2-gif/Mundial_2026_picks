export const config = { runtime: "edge" };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export default async function handler(req) {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) return new Response(JSON.stringify({ error: "GROQ_API_KEY no configurada en Vercel" }), { status: 500, headers });

  const { team } = await req.json();
  if (!team) return new Response(JSON.stringify({ error: "Falta el campo team" }), { status: 400, headers });

  const prompt = `You are a football statistics expert with access to current data.
Provide REAL statistics for the ${team} national football team based on their 2024 and 2025 international matches.
Use your knowledge of recent tournaments: World Cup 2026 qualifiers, Nations League, Copa América 2024, AFCON 2025, Euro 2024, AFC qualifiers, CONCACAF Nations League, and friendly matches from 2024-2025.

Return ONLY a valid JSON object, no markdown, no explanation:
{
  "rank": <current FIFA ranking as integer>,
  "form": <average points per game last 15 matches, decimal 0.0-3.0>,
  "gs": <average goals scored per match in 2024-2025, decimal>,
  "gc": <average goals conceded per match in 2024-2025, decimal>,
  "corners": <estimated average corners won per match, decimal>,
  "yellows": <average yellow cards per match in 2024-2025, decimal>,
  "reds": <average red cards per match in 2024-2025, decimal>,
  "att": <attacking strength 0-100 integer based on recent output>,
  "def": <defensive strength 0-100 integer based on recent goals conceded>,
  "confederation": <"UEFA" or "CONMEBOL" or "CONCACAF" or "AFC" or "CAF" or "OFC">,
  "last5": <array of exactly 5 strings like "W 2-0 vs Brazil" from most recent matches>,
  "keyPlayers": <array of 3 current key player names>,
  "notes": <one sentence about current form, injuries or key news for 2026 World Cup preparation>
}`;

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${groqKey}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return new Response(JSON.stringify({ error: `Groq error: ${groqRes.status} — ${err}` }), { status: 502, headers });
    }

    const groqData = await groqRes.json();
    const text = groqData.choices?.[0]?.message?.content || "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return new Response(JSON.stringify({ error: "No se pudo parsear respuesta de Groq", raw: text }), { status: 502, headers });

    const parsed = JSON.parse(match[0]);
    return new Response(JSON.stringify(parsed), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
