
const deleteConversation = ({ id, title, submit }) => {
  const deleteConfirm = confirm(
    `Delete chat? \n\nYou'll no longer see this chat here. This will also delete related activity like propmts, responses.`
  )
  if (deleteConfirm) {
    // console.log('conversation deleted');

    submit({
      request_type: 'delete_conversation',
      conversation_id: id,
      conversation_title: title,
    },
      {
        method: 'DELETE',
        encType: 'application/x-www-form-urlencoded',
        action: '/'
      })

  } else {
    console.log('user cancelled the request');

  }
}

export default deleteConversation
