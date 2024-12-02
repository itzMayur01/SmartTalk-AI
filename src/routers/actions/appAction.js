import { redirect } from "react-router-dom";
import { getAiResponse, getConversationTitle } from "../../api/googleAi";
import { account, databases } from "../../lib/appwrite";
import generateID from "../../utils/generateID";


/**
 * Handles th user propmt action, creating a conversation and storing both the user's propmt and the AI-generated response
 * @param {*} formData - The form data containing the user's propmt.
 * @returns  {Promise} - Redirect the user to the newly created conversation page.
 */

const userPromptAction = async (formData) => {
  const userPrompt = formData.get('user_prompt');

  // Get current user info
  const user = await account.get()

  // Get a conversation title based on user_prompt
  const conversationTitle = await getConversationTitle(userPrompt)
  // console.log(conversationTitle);

  let conversation = null

  try {
    // Create a new conversation document in the Appwrite database
    conversation = await databases.createDocument(import.meta.env.VITE_APPPWRITE_DATABASE_ID,
      'conversations',
      generateID(),
      {
        title: conversationTitle,
        user_id: user.$id,
      }
    )

  } catch (error) {
    console.log(`Error creating conversation: ${error.message}`);

  }

  // Generate an AI response based on the user's prompt
  const aiResponse = await getAiResponse(userPrompt);
  // console.log(aiResponse);

  try {
    // Create a new chat document in the 'chats collection'
    await databases.createDocument(import.meta.env.VITE_APPPWRITE_DATABASE_ID,
      'chats',
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      },

    );
  } catch (error) {
    console.log(`Error creating chat: ${error.message}`);

  }

  return redirect(`${conversation.$id}`)

}



/**
 * Delete a conversation document from the data base and return the conversation title
 * @param {*} formData - The form data containing the conversation title
 * @returns {Promise} - Returns an object containing the conversation title after deletion.
 * @throws will throw an error if the deletion process fails
 */
const conversationAction = async (formData) => {
  const conversationId = formData.get('conversation_id');
  const conversationTitle = formData.get('conversation_title');

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPPWRITE_DATABASE_ID,
      'conversations',
      conversationId,
    )
    return { conversationTitle }
  } catch (error) {
    console.log(`Error in deleting conversation: ${error.message}`);

  }

}






/**
 * Handles incoming requests based on the     'request_type' form data
 * 
 * @param {object} request - The incoming request object containing the form data
 * @returns {Promise} - Returns the result of the action based on the 'request_type' (eg.., 'userPromptAction' or 'conversationAction')
 * */
const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type')



  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  }

  if (requestType === 'delete_conversation') {
    return await conversationAction(formData)
  }
}

export default appAction
