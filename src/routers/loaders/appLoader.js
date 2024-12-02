import { redirect } from "react-router-dom";
import { account, databases } from "../../lib/appwrite"
import { Query } from "appwrite";

const appLoader = async () => {
  const data = {}
  try {
    //Attempt to retrieve the user's account info.
    data.user = await account.get()
  } catch (error) {
    console.log(`Error getting user session: ${error.message}`);
    // Redirect to login page if account retrieval fails
    return redirect('/login')
  }

  try {
    data.conversations = await databases.listDocuments(import.meta.env.VITE_APPPWRITE_DATABASE_ID, 'conversations',
      [
        Query.select(['$id', 'title']), //Instead of fetching all fields of each document, this query limits the output to only include the $id (document ID) and title fields.
        Query.orderDesc('$createdAt'), //orderDesc ensures the newest documents appear first (most recent to oldest).
        Query.equal('user_id', data.user.$id),//Filters documents to only include those where the user_id field matches the authenticated user’s ID.

      ]
    );

  } catch (error) {
    console.log(`Error getting conversation: ${error.message}`);

  }
  return data;
}

export default appLoader
