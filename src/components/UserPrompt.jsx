import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { useLoaderData } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { IconBtn } from './Button';

const UserPrompt = ({ text }) => {
  // Use the useToggle hook t manage the expanded state of th euser prompt text
  const [isExpanded, toggleExpand] = useToggle();

  // Create a ref to access the text box elemwnt in the DOM
  const textBoxRef = useRef();

  // Initalize the hasMoreContent state, indicating whether the content exceeds the visible height of the text box.
  const [hasMoreContent, setMoreContent] = useState(false);

  /**
   * Use useEffect to update the hasMoreContent state whenever the text box ref changes.
   * This esures that the state is updated correctly if the text box content changes
   */
  useEffect(() => {
    setMoreContent(
      textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight,
    );
  }, [textBoxRef]);

  const { user } = useLoaderData();
  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5'>
      <Avatar name={user?.name} />
      <p
        className={`bg-light-surfaceContainerHighest dark:bg-dark-surfaceContainerHighest rounded-2xl  ps-4 pe-2 p-6 mt-1 text-bodyLarge whitespace-pre-wrap  ${!isExpanded ? 'line-clamp-4' : ''}`}
        ref={textBoxRef}
      >
        {text}
      </p>
      {hasMoreContent && (
        <IconBtn
          icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          onClick={toggleExpand}
          title={isExpanded ? 'Collapse text' : 'Expand text'}
        />
      )}
    </div>
  );
};

UserPrompt.propTypes = {
  text: PropTypes.string,
};

export default UserPrompt;
