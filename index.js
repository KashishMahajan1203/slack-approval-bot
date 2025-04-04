// File structure:
// - app.js (main server file)
// - config.js (configuration)
// - routes/slack.js (slack routes)
// - services/slackService.js (slack API interactions)
// - utils/messages.js (message templates)
// - package.json (dependencies)
// - .env.example (environment variables template)


const express = require('express');
const bodyParser = require('body-parser');
const { slackRoutes } = require('./routes/slack');
const config = require('./config');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());

// Routes
app.use('/slack', slackRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;