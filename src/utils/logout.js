
import { account } from "../lib/appwrite"

/**
 * Logs out the current user y deleting their session and navigates to the login page.
 * 
 * @param navigate - The navigation function to redirect the user after logout
 * 
 * @returns {Promise} - Returns a promise that resolves once the session is deleted and navigation occurs.
 */

const logout = async (navigate) => {
  try {
    await account.deleteSession('current')
  } catch (error) {
    return console.log(`Error deleting user session: ${error.message}`);

  }
  return navigate('/login')
}

export default logout
