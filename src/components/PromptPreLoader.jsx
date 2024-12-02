import PropTypes from 'prop-types';
import React from 'react';
import UserPrompt from './userPrompt';
import AiResponse from './AiResponse';
import Skeleton from './Skeleton';

const PromptPreLoader = ({ promptValue }) => {
  console.log(promptValue);

  return (
    <div className='max-w-[700px] mx-auto'>
      <UserPrompt text={promptValue} />
      <AiResponse>
        <Skeleton />
      </AiResponse>
    </div>
  );
};

PromptPreLoader.propTypes = {
  promptValue: PropTypes.string,
};

export default PromptPreLoader;
