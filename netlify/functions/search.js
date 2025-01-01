const { OpenAI } = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use the environment variable here
});

app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant providing Bible verse references.' },
        { role: 'user', content: `Find Bible verses related to: "${query}". Provide verse references and a brief summary.` },
      ],
    });
    
    const results = response.choices[0].message.content.trim();
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch data. Please try again later.' });
  }
});
