const { WebClient } = require('@slack/web-api');
const messages = require('../utils/messages');
const config = require('../config');

const web = new WebClient(config.SLACK_BOT_TOKEN);

/**
 * Opens the approval request modal
 */
async function openApprovalModal(triggerId) {
  try {
    await web.views.open({
      trigger_id: triggerId,
      view: messages.getApprovalModal()
    });
  } catch (error) {
    console.error('Error opening modal:', error);
    throw error;
  }
}

/**
 * Handles modal submission
 */
async function handleModalSubmission(payload) {
  try {
    const { user, view } = payload;
    const values = view.state.values;
    
    // Extract data from submission
    const approver = values.approver_block.approver_select.selected_user;
    const approvalText = values.approval_block.approval_input.value;
    const requester = user.id;
    
    // Send approval request message to approver
    await web.chat.postMessage({
      channel: approver,
      ...messages.getApprovalRequestMessage(requester, approvalText)
    });
    
    // Send confirmation to requester
    await web.chat.postMessage({
      channel: requester,
      text: `Your approval request has been sent to <@${approver}>.`
    });
    
  } catch (error) {
    console.error('Error handling modal submission:', error);
    throw error;
  }
}

/**
 * Handles button actions (approve/reject)
 */
async function handleButtonAction(payload) {
  try {
    const { actions, user, message } = payload;
    const action = actions[0];
    
    // Extract data from the message
    const { requesterId, approvalText } = JSON.parse(message.metadata || '{}');
    
    if (action.action_id === 'approve_button' || action.action_id === 'reject_button') {
      const isApproved = action.action_id === 'approve_button';
      const status = isApproved ? 'approved' : 'rejected';
      
      // Update the original message to show the decision
      await web.chat.update({
        channel: user.id,
        ts: message.ts,
        ...messages.getUpdatedApprovalMessage(requesterId, approvalText, status, user.id)
      });
      
      // Notify the requester
      await web.chat.postMessage({
        channel: requesterId,
        ...messages.getRequesterNotificationMessage(approvalText, status, user.id)
      });
    }
  } catch (error) {
    console.error('Error handling button action:', error);
    throw error;
  }
}

module.exports = {
  openApprovalModal,
  handleModalSubmission,
  handleButtonAction
};