
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

/**
 *  Custom hook to manage the preloader value for the prompt
 *
 * @returns - An object containing the current propmt preloader value
 */
const usePromptPreloader = () => {
  const navigation = useNavigation();


  const [promptPreloaderValue, setpromptPreloaderValue] = useState('');

  //use useeffect to update preloader value based on navigation.formdata
  useEffect(() => {
    //if form data exists, get the user prompt and update the preloader value
    if (navigation.formData) {
      const userPrompt = navigation.formData.get('user_prompt');
      setpromptPreloaderValue(userPrompt || '');

    } else {
      // If no form data found, reset preloader value to empty string..
      setpromptPreloaderValue('');
    }
  }, [navigation]);// Run effect only when navigation state changes
  return { promptPreloaderValue }
};

export { usePromptPreloader };
