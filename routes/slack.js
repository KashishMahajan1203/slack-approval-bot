
const express = require('express');
const { createVerify } = require('crypto');
const slackService = require('../services/slackService');
const config = require('../config');

const router = express.Router();

// Verify Slack requests middleware
const verifySlackRequest = (req, res, next) => {
  const signature = req.headers['x-slack-signature'];
  const timestamp = req.headers['x-slack-request-timestamp'];
  
  // Prevent replay attacks
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    return res.status(400).send('Ignored - possible replay attack');
  }
  
  const hmac = createVerify('sha256')
    .update(`v0:${timestamp}:${req.rawBody}`)
    .verify(config.SLACK_SIGNING_SECRET, signature, 'hex');
    
  if (hmac) {
    next();
  } else {
    res.status(401).send('Verification failed');
  }
};

// Slash command endpoint
router.post('/command', verifySlackRequest, async (req, res) => {
  const { command, trigger_id } = req.body;
  
  if (command === '/approval-test') {
    try {
      await slackService.openApprovalModal(trigger_id);
      res.status(200).send();
    } catch (error) {
      console.error('Error opening modal:', error);
      res.status(500).send('Failed to open approval modal');
    }
  } else {
    res.status(404).send('Unknown command');
  }
});

// Interactive components endpoint (button actions, modal submissions)
router.post('/interactions', verifySlackRequest, async (req, res) => {
  const payload = JSON.parse(req.body.payload);
  
  try {
    switch (payload.type) {
      case 'view_submission':
        await slackService.handleModalSubmission(payload);
        res.status(200).send();
        break;
        
      case 'block_actions':
        await slackService.handleButtonAction(payload);
        res.status(200).send();
        break;
        
      default:
        res.status(404).send('Unknown interaction type');
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    res.status(500).send('Failed to handle interaction');
  }
});

module.exports = { slackRoutes: router };