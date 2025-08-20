const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>DevOps CI/CD Test</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        text-align: center;
                        padding: 40px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                        backdrop-filter: blur(10px);
                    }
                    h1 { font-size: 3em; margin-bottom: 20px; }
                    .version { 
                        background: #4CAF50; 
                        padding: 10px 20px; 
                        border-radius: 25px; 
                        display: inline-block;
                        margin: 10px;
                    }
                    .timestamp { font-size: 0.9em; opacity: 0.9; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 DevOps Lab App</h1>
                    <div class="version">Version 2.0 - CI/CD ACTIVE!</div>
                    <p>If you see this, your CI/CD pipeline is working!</p>
                    <p class="timestamp">Deployed at: ${new Date().toLocaleString()}</p>
                </div>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`App running on port ${port} - Version 2.0 - Updated at ${new Date().toLocaleString()}`);
});