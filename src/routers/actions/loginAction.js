import { redirect } from "react-router-dom";
import { account } from "../../lib/appwrite";

const loginAction = async ({ request }) => {
  //Retrieve the form data from the incoming request
  const formData = await request.formData();
  try {
    //Attempt to create a session using email and password from the form data

    await account.createEmailPasswordSession(
      formData.get('email'),
      formData.get('password')
    )
    // On successfull login, redirect the user to homepage 
    return redirect('/')

  } catch (error) {
    return {
      message: error.message,
    };
  }
}

export default loginAction;