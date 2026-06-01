export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Missing question' });
  }

  const SYS_PROMPT = `You are a warm, honest pregnancy information assistant inside a pregnancy-tracking app for first-time moms. Give clear, accurate, evidence-based answers. For food-safety questions, start with a one-word verdict in this exact format on its own first line: "VERDICT: yes" or "VERDICT: no" or "VERDICT: caution". Then explain in 2-4 sentences, plainly and reassuringly. Be honest about uncertainty. For anything involving symptoms, pain, bleeding, medication dosing, or personal medical risk, do not diagnose — clearly recommend contacting their healthcare provider. Never invent facts. Keep answers concise and kind.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYS_PROMPT,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const text = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();

    return res.status(200).json({ answer: text });
  } catch (e) {
    console.error('Handler error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
