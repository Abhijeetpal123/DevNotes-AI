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
          content:
            "You are an AI learning assistant for developers. Summarize technical notes clearly and concisely. Preserve important technical terms, concepts, and key points. Use simple bullet points when appropriate.",
        },
        {
          role: "user",
          content: `Summarize the following developer note:\n\n${note}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
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

module.exports =  {summarizeNote}