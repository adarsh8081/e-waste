const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Initialize Python assistant process
let assistantProcess = null;

function initializeAssistant() {
    const pythonPath = process.env.PYTHON_PATH || 'python';
    assistantProcess = spawn(pythonPath, ['ml_scripts/inference.py'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    assistantProcess.stdout.on('data', (data) => {
        console.log(`Assistant stdout: ${data}`);
    });

    assistantProcess.stderr.on('data', (data) => {
        console.error(`Assistant stderr: ${data}`);
    });

    assistantProcess.on('close', (code) => {
        console.log(`Assistant process exited with code ${code}`);
        assistantProcess = null;
    });
}

// Initialize assistant on server start
initializeAssistant();

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Ensure assistant process is running
        if (!assistantProcess) {
            console.log('Restarting assistant process...');
            initializeAssistant();
        }

        // Send message to Python process
        assistantProcess.stdin.write(JSON.stringify({ message }) + '\n');

        // Wait for response
        const response = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Response timeout'));
            }, 30000);

            assistantProcess.stdout.once('data', (data) => {
                clearTimeout(timeout);
                try {
                    const response = JSON.parse(data.toString());
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            });
        });

        res.json({ response: response.text });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({
            error: 'An error occurred while processing your request',
            details: error.message
        });
    }
});

// Gracefully shutdown assistant process
process.on('SIGTERM', () => {
    if (assistantProcess) {
        assistantProcess.kill();
    }
    process.exit(0);
});

// Handle React routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
}); 