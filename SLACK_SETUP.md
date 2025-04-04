# Slack Approval Bot Setup Guide

## 1. Create a Slack App
1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click "Create New App"
3. Select "From scratch"
4. Enter app name (e.g., "Approval Bot") and select your workspace

## 2. Configure Basic Information
1. Under "Basic Information":
   - Add app icon/description
   - Note your "Signing Secret" (add to .env as SLACK_SIGNING_SECRET)
   - Generate "App-Level Token" (add to .env as SLACK_APP_TOKEN)

## 3. Set Up OAuth & Permissions
1. Under "OAuth & Permissions":
   - Add these bot token scopes:
     - `chat:write`
     - `commands`
     - `users:read`
     - `users:read.email`
   - Install to workspace
   - Copy "Bot User OAuth Token" (add to .env as SLACK_BOT_TOKEN)

## 4. Create Slash Command
1. Under "Slash Commands":
   - Create new command:
     - Command: `/approval-test`
     - Request URL: `https://your-domain.com/slack/command`
     - Description: "Request approval from team members"
     - Usage hint: "[details]"

## 5. Enable Interactivity
1. Under "Interactivity & Shortcuts":
   - Turn on Interactivity
   - Set Request URL: `https://your-domain.com/slack/interactions`

## 6. Deploy Your Bot
1. Start the server: `npm start`
2. Use ngrok for local testing: `ngrok http 3000`
3. Update Slack app URLs with your ngrok URL

## 7. Test Your Bot
1. In Slack, type `/approval-test`
2. Verify the approval flow works end-to-end
