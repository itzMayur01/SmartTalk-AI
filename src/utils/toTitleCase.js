export default function toTitleCase(text) {
  return (
    text
      .split(' ') //Splits the string into words using .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1)) //word[0]: Gets the first character of the word.
      //word.slice(1): Gets the rest of the word, starting from the second character.
      .join(' ') // Combines all words back into a single string with spaces.
  );
}
