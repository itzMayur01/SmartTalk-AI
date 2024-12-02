import { redirect } from "react-router-dom"
import { account, databases } from "../../lib/appwrite"

const conersationLoader = async ({ params }) => {
  const { conversationId } = params
  const data = {}

  try {
    // Attempt to retrieve the user account infro
    data.user = await account.get()
  } catch (error) {
    console.log(`Error getting user account: ${error.message}`);
    // If there's an errror getting the user, log it and redirect to the login page.
    return redirect('/login')
  }

  try {
    // Attempt to fetch the conversation document form the Appwrite database.
    data.conversation = await databases.getDocument(
      import.meta.env.VITE_APPPWRITE_DATABASE_ID, 'conversations',
      conversationId,

    )
  } catch (error) {
    console.log(`Error getting conversation: ${error.message}`);
    throw error; // Re-throw the error so it can be handled by th error boundry or a suitable component
  }

  return data; // Return the data containing user and conversation information.
}

export default conersationLoader;
