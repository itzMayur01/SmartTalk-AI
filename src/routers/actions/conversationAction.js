import { databases } from "../../lib/appwrite";
import { getAiResponse } from "../../api/googleAi";
import generateID from "../../utils/generateID";
import { param } from "framer-motion/client";

/**
 *  Hamdles the conversation action, processing the user's prompt and stroing the AI response in the database.
 * 
 * @param request - The request object containing form data from the client.
 * @param params - The route paramerters.
 * @returns {Promise<null>} Returns null after processing and storing data.
 * @throws will log an error message to the console if storing data fails.
 */


const conversationAction = async ({ request, params }) => {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get('user_prompt');
  // console.log(conversationId);
  // console.log(userPrompt);

  let chatHistory = [];
  let aiResponse = '';

  try {
    const { chats } = await databases.getDocument(
      import.meta.env.VITE_APPPWRITE_DATABASE_ID,
      'conversations',
      conversationId
    )
    // console.log(chats);
    chatHistory = chats.map(({ user_prompt, ai_response }) => {
      return { user_prompt, ai_response }
    });
    // console.log(chatHistory);

  } catch (error) {
    console.log(`Error getting chat: ${error.message}`);

  }

  try {
    aiResponse = await getAiResponse(userPrompt, chatHistory);
  } catch (error) {
    console.log(`Error getting Gemini response: ${error.message}`);

  }


  try {
    await databases.createDocument(
      import.meta.env.VITE_APPPWRITE_DATABASE_ID,
      'chats',
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversationId
      }
    )
  } catch (error) {
    console.log(`Error storing chat: ${error.message}`);

  }

  return null


}

export default conversationAction;