const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { insertMessage, getMessages } = require('./query'); // Adjust path as needed
const serverless = require('serverless-http'); // Add this dependency

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API to store a new message
app.post('/api/add-message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  insertMessage(message, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save message' });
    }
    res.status(200).json(result);
  });
});

// API to fetch all messages
app.get('/api/get-messages', (req, res) => {
  getMessages((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
    res.status(200).json(rows);
  });
});

module.exports = serverless(app); // Export as a serverless function


const PORT = process.env.PORT || 3001;  // Default to port 3001 or use an environment variable if set

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});