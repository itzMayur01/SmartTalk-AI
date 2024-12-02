import { redirect } from "react-router-dom";
import { account } from "../../lib/appwrite"
//This function checks whether the user is logged in by attempting to fetch account information.

const resetPasswordLoader = async ({ request }) => {
  const url = new URL(request.url);
  try {
    //Atempt to retrieve the user's account information
    const user = await account.get();

    //If account retrieval is successful, redirect the user to the homepage('/)
    return redirect('/');


  } catch (error) {
    console.log(`Error getting user session: ${error.message}`);
  }
  if (!url.searchParams.get('userId') && !url.searchParams.get('secret')) {
    return redirect('/reset-link')
  }
  return null;
}



export default resetPasswordLoader;