const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai'); // Ensure only one import of OpenAI

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log(process.env.OPENAI_API_KEY); // Add this temporarily to check


// Initialize OpenAI with environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This will reference the environment variable
});

// Search Bible verses
app.post('/api/search', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a Bible search assistant.' },
        { role: 'user', content: `Find Bible verses related to: "${query}" and also give a response addressing if they mention emotion.` },
      ],
    });

    const results = response.choices[0].message.content.trim();
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching search data:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching data. Please try again.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
