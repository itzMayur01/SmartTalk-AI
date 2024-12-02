import { redirect } from "react-router-dom";
import { account } from "../../lib/appwrite"
//This function checks whether the user is logged in by attempting to fetch account information.

const resetLinkLoader = async () => {
  try {
    //Atempt to retrieve the user's account information
    const user = await account.get();
    // console.log(user);

  } catch (error) {
    console.log(`Error getting user session: ${error.message}`);
    return null;
  }

  //If account retrieval is successful, redirect the user to the homepage('/)
  return redirect('/');
}

export default resetLinkLoader;