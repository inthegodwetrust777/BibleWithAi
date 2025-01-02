const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai'); // Use OpenAI directly

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your environment variable for the API key
});

// API Endpoint to Search for Bible Verses
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
