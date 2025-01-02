const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { OpenAI } = require('openai'); // Ensure OpenAI module is installed

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is safe and secure
});


// Search Bible verses
app.post('/api/search', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a Bible search assistant.' },
        { role: 'user', content: `Find Bible verses related to: "${query}".` },
      ],
    });

    const results = response.choices[0].message.content.trim();
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching search data:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching data. Please try again.' });
  }
});

