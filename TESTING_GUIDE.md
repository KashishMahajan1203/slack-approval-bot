# Local Testing Guide for Slack Approval Bot

## Prerequisites
1. Node.js installed (v14+ recommended)
2. ngrok installed (`npm install -g ngrok`)
3. Slack app configured (as per SLACK_SETUP.md)
4. .env file populated with credentials

## 1. Start Local Server
```bash
npm install
npm run dev
```

## 2. Set Up ngrok Tunnel
```bash
ngrok http 3000
```
- Note the HTTPS URL provided by ngrok (e.g., `https://abc123.ngrok.io`)

## 3. Update Slack App Configuration
1. Update these URLs in your Slack app settings:
   - Slash Command URL: `https://abc123.ngrok.io/slack/command`
   - Interactivity URL: `https://abc123.ngrok.io/slack/interactions`

## 4. Test the Workflow
1. In your Slack workspace:
   - Type `/approval-test`
   - Verify the modal appears
   - Submit a test request

2. As the approver:
   - Check your DMs for the approval request
   - Test both Approve and Reject buttons
   - Verify notifications are received

## 5. Expected Flow
1. Requester:
   - Submits request via `/approval-test`
   - Receives confirmation message
   - Gets decision notification

2. Approver:
   - Receives request message with buttons
   - Sees updated message after decision
   - Original requester gets notified

## Troubleshooting
- Check server logs for errors
- Verify all tokens in .env are correct
- Ensure ngrok is running and URLs are updated
- Check Slack app permission scopes
