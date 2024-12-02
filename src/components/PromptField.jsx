import { motion } from 'framer-motion';
import { IconBtn } from './Button';
import { useCallback, useRef, useState } from 'react';
import { useNavigation, useParams, useSubmit } from 'react-router-dom';
const PromptField = () => {
  // 'inputField' and 'inputFieldContainer' hold refrences to their Dom elemments
  const inputField = useRef();
  const inputFieldContainer = useRef();

  // Manual form submssion
  const submit = useSubmit();

  // initial navigation for checking state
  const navigation = useNavigation;

  // Retrieve the conversation id from url path
  const { conversationId } = useParams();

  // State for input field
  const [placeholderShown, setPlaceholderShown] = useState(true);
  const [isMultiline, setMultiline] = useState(false);
  const [inputValue, setInputValue] = useState(false);

  // Handle input field input change
  const handleInputChange = useCallback(() => {
    if (inputField.current.innerText === '\n')
      inputField.current.innerHTML = '';
    setPlaceholderShown(!inputField.current.innerText);
    setMultiline(inputFieldContainer.current.clientHeight > 64);
    setInputValue(inputField.current.innerText.trim());
  }, []);

  //   Move cursor to end after paste text in input field
  const moveCursorToEnd = useCallback(() => {
    const editableElem = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();

    // Set the range to the last child of the editable element
    range.selectNodeContents(editableElem);
    range.collapse(false); //Collapse th eranage to the end

    // Clear existing selections and add the new range
    selection.removeAllRanges();
    selection.addRange(range);
  });

  // Handle paste text
  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      inputField.current.innerText += e.clipboardData.getData('text');
      handleInputChange();
      moveCursorToEnd();
    },
    [handleInputChange, moveCursorToEnd],
  );

  // Handle submit
  const handleSubmit = useCallback(() => {
    //   Prevent submission if the input is empty or form submission ongoing.

    if (!inputValue || navigation.state === 'submitting') return;
    submit(
      {
        user_prompt: inputValue,
        request_type: 'user_prompt',
      },
      {
        method: 'POST',
        encType: 'application/x-www-form-urlencoded',
        action: `${conversationId || ''}`,
      },
    );

    inputField.current.innerHTML = '';
    handleInputChange();
  }, [handleInputChange, inputValue, navigation.state, submit, conversationId]);

  // Defines a Framer Motion varient for the prompt field, controlling its animation based on its visibility state.
  const promptFieldVarient = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      },
    },
  };

  // Defines a Framer Motion varient for the prompt field, controlling its animation based on its visibility state.

  const promptFieldChildrenVarient = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={promptFieldVarient}
      initial='hidden'
      animate='visible'
      className={`prompt-field-container ${isMultiline ? 'rounded-large' : ''}`}
      ref={inputFieldContainer}
    >
      <motion.div
        className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
        contentEditable={true}
        role='textbox'
        aria-multiline={true}
        aria-label='Enter a prompt here'
        data-placeholder='Enter a propmt here'
        variants={promptFieldChildrenVarient}
        ref={inputField}
        onInput={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          // Handle case where user press only 'Enter' key
          if (e.key === 'Enter' && !e.shiftKey) {
            // Submit input
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <IconBtn
        icon='send'
        title='submit'
        size='large'
        classes='ms-auto'
        variants={promptFieldChildrenVarient}
        onClick={handleSubmit}
      />
      <div className='state-layer'></div>
    </motion.div>
  );
};

export default PromptField;
