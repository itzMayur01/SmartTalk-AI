/**
 * 
 * Generate a unique ID by combining the current timestamp and a ramdom number
 * This function create an identifier using the current time in miliseconds
 * (converted to a base-36 string) concat with a random number
 * also converted to a base-36 string and sliced to remove unnecssary characters
 * 
 */

export default function generateID() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
