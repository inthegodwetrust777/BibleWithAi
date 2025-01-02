const { OpenAI } = require('openai');
console.log(process.env.OPENAI_API_KEY)
module.exports = async (req, res) => {
  const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This will reference the environment variable
});

  const { query } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant providing Bible verse references and also helping users with Bible verses related to their emotions.' },
        { role: 'user', content: `Find Bible verses related to: "${query}". Provide verse references and a brief summary.` },
      ],
    });

    res.json({ success: true, results: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data. Please try again later.' });
  }
};
