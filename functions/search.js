// /functions/search.js
const { OpenAI } = require("openai");

module.exports = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { query } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant providing Bible verse references and also make sure you reponse by addressing their mood user input their emotions by helping with bible verses." },
        { role: "user", content: `Find Bible verses related to: "${query}". Provide verse references and a brief summary.` },
      ],
    });

    res.json({ success: true, results: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data. Please try again later." });
  }
};
