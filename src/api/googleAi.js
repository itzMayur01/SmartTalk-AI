import { Role } from "appwrite";
import model from "../lib/googleAi";


/**
 *  Generates a short conversation title based in the provided user prompt.
 * 
 *  This function utilizes google generative ai model to create a concise title
 * for a conversation, it sends th user propmt to the model and requests a
 * generated response contaning a sigle short title
 *  
 * @param userPrompt - The text input from which the conversation titile will be generated.
 * @returns {Promise <string>} -  A PROMISE that resolves to the generated conversation title as a plain text string
 * */

const getConversationTitle = async (userPropmt) => {

  try {
    const result = await model.generateContent(
      `Given a user prompt, generate a concise and informative title that accuratly describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.
      
      Prompt: ${userPropmt}`,
    );
    return result.response.text();

  } catch (error) {
    console.log(`Error generating convesation title: ${error.message}`);

  }
}


/**
 *  Generate a response from an AI model based on the user's propmt and the chat history
 * 
 * @param {string} userPrompt - The user's input prompt.
 * @param {Array<{user_prompt:string, ai_response:string}>} chats - An array of previous user propmts and AI responses, used to provide context to the model
 */

const getAiResponse = async (userPrompt, chats = []) => {
  const history = [];
  chats.forEach(({ user_prompt, ai_response }) => {
    history.push({
      role: 'user',
      parts: [{ text: user_prompt }]
    },
      {
        role: 'model',
        parts: [{ text: ai_response }]

      })
  })

  // console.log(history);

  try {
    model.generationConfig = { temperature: 1.5 };
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userPrompt)
    return result.response.text()
  } catch (error) {
    console.log(`Error generating AI response: ${error.message}`);

  }
}

export { getConversationTitle, getAiResponse }