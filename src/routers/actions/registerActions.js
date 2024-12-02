import { redirect } from "react-router-dom";
import { account } from "../../lib/appwrite";
import generateID from "../../utils/generateID";

/**
 * Handle user registeration
 */
const registerAction = async ({ request }) => {
  //retrieve the form data from the incoming request
  const formData = await request.formData();
  try {
    /**
     * create new user account using the provided email, password and name
     */
    await account.create(
      generateID(),  // Generate unique id for the user
      formData.get('email'),  // Retrives EMAIL from form data
      formData.get('password'), // Retrives PASSWORD from form data
      formData.get('name'), // Retrives NAME from form data
    )

  } catch (error) {

    return {
      message: error.message,
    }

  }

  //After succesfully account create, login the user and redirect to homepage

  try {
    //creats a session for the new user with the provided email and password

    await account.createEmailPasswordSession(
      formData.get('email'),
      formData.get('password'),
    );
  } catch (error) {
    console.log(`Error creating email session: ${error.message} `);
    return redirect('/login');
  }
  //Redirects the user to the home page upon successful registration and login
  return redirect('/');

}

export default registerAction