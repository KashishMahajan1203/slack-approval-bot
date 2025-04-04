
/**
 * Returns the modal view for approval requests
 */
function getApprovalModal() {
    return {
      type: 'modal',
      callback_id: 'approval_modal',
      title: {
        type: 'plain_text',
        text: 'Request Approval',
        emoji: true
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Select an approver and enter your request details.'
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'input',
          block_id: 'approver_block',
          element: {
            type: 'users_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select an approver',
              emoji: true
            },
            action_id: 'approver_select'
          },
          label: {
            type: 'plain_text',
            text: 'Approver',
            emoji: true
          }
        },
        {
          type: 'input',
          block_id: 'approval_block',
          element: {
            type: 'plain_text_input',
            multiline: true,
            action_id: 'approval_input',
            placeholder: {
              type: 'plain_text',
              text: 'Enter details about what you need approved...',
              emoji: true
            }
          },
          label: {
            type: 'plain_text',
            text: 'Approval Details',
            emoji: true
          }
        }
      ]
    };
  }
  
  /**
   * Returns the approval request message to be sent to the approver
   */
  function getApprovalRequestMessage(requesterId, approvalText) {
    return {
      text: `You have a new approval request from <@${requesterId}>`,
      metadata: JSON.stringify({ requesterId, approvalText }),
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New Approval Request*\nFrom: <@${requesterId}>\n\n${approvalText}`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Approve',
                emoji: true
              },
              style: 'primary',
              action_id: 'approve_button'
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Reject',
                emoji: true
              },
              style: 'danger',
              action_id: 'reject_button'
            }
          ]
        }
      ]
    };
  }
  
  /**
   * Returns the updated message after a decision has been made
   */
  function getUpdatedApprovalMessage(requesterId, approvalText, status, approverId) {
    const statusText = status === 'approved' ? 'Approved ✅' : 'Rejected ❌';
    const statusColor = status === 'approved' ? '#36a64f' : '#e01e5a';
    
    return {
      text: `Approval request from <@${requesterId}> has been ${status}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Approval Request ${statusText}*\nFrom: <@${requesterId}>\n\n${approvalText}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Request was ${status} by <@${approverId}> on <!date^${Math.floor(Date.now()/1000)}^{date_short_pretty} at {time}|today>.`
            }
          ]
        }
      ]
    };
  }
  
  /**
   * Returns the notification message for the requester
   */
  function getRequesterNotificationMessage(approvalText, status, approverId) {
    const statusText = status === 'approved' ? 'Approved ✅' : 'Rejected ❌';
    const statusColor = status === 'approved' ? '#36a64f' : '#e01e5a';
    
    return {
      text: `Your approval request has been ${status} by <@${approverId}>`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Your Approval Request Has Been ${statusText}*\n\n${approvalText}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `<@${approverId}> ${status} your request on <!date^${Math.floor(Date.now()/1000)}^{date_short_pretty} at {time}|today>.`
            }
          ]
        }
      ]
    };
  }
  
  module.exports = {
    getApprovalModal,
    getApprovalRequestMessage,
    getUpdatedApprovalMessage,
    getRequesterNotificationMessage
  };