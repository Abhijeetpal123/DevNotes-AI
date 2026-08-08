const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const summarizeNote = async (req, res) => {
  try {
    const { note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note i required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert AI assistant for developers.

Your ONLY task is to summarize technical notes.

Rules:
- Create a concise summary.
- Keep only the most important points.
- Do NOT explain concepts.
- Do NOT add any new information.
- Preserve technical terms and keywords.
- Return the summary as Markdown bullet points.
- Maximum 5 bullet points.
- Keep the response under 120 words.
`,
        },
        {
          role: "user",
          content: `Summarize the following developer notes:

${note}`,
        },
      ],

      temperature: 0.2,
      max_tokens: 300,
    });
    const summary = completion.choices[0]?.message?.content;

    if (!summary) {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate a summary",
      });
    }

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("AI Summarize Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to summarize note",
    });
  }
};

const explainNote = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is Required",
      });
    }
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer and mentor.

Your task is to explain programming and computer science concepts in simple beginner-friendly language.

Rules:
- Explain clearly and simply.
- Preserve technical accuracy.
- Use easy words.
- Give one real-world analogy if helpful.
- Give one short practical example if appropriate.
- Keep the explanation under 200 words.
- Return clean Markdown.
`,
        },
        {
          role: "user",
          content: `Explain this concept:

${text}`,
        },
      ],

      temperature: 0.4,
      max_tokens: 500,
    });

    const explanation = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { summarizeNote, explainNote };
