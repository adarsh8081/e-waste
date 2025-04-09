const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-domain.vercel.app'] 
    : '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Hugging Face API configuration
        const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
        const headers = {
            "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json"
        };

        // Prepare the payload for the model
        const payload = {
            inputs: {
                text: message,
                past_user_inputs: [],
                generated_responses: []
            }
        };

        // Make request to Hugging Face API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.statusText}`);
        }

        const result = await response.json();
        
        res.json({ 
            response: result.generated_text || "I'm sorry, I couldn't process that request."
        });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({
            error: 'An error occurred while processing your request',
            details: process.env.NODE_ENV === 'production' 
                ? 'Internal server error' 
                : error.message
        });
    }
});

// Handle React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// Export the Express API
module.exports = app; 