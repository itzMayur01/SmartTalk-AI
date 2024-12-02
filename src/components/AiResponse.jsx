import PropTypes from 'prop-types';
import { logoIcon } from '../assests/assests';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighLighter } from 'react-syntax-highlighter';
import { hopscotch, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IconBtn } from './Button';
import { useCallback, useEffect, useState } from 'react';
import toTitleCase from '../utils/toTitleCase';
import { toast } from 'react-toastify';
const AiResponse = ({ aiResponse, children }) => {
  // Intialize the codeTheme state to an empty string, this will be used to store the selected code theme.

  const [codeTheme, setCodeTheme] = useState('');

  // Use to detect changes in the user's preferred color scheme
  useEffect(() => {
    // Create a media query to detect the user's preferred color scheme.
    const mediaQuery = window.matchMedia('(prefers-color-scheme:dark)');

    //Initially set the codeTheme based on the current media query result.
    setCodeTheme(mediaQuery.matches ? hopscotch : coy);

    //Create n event listner to handle changes in the preferred color scheme.
    const themeListner = mediaQuery.addEventListener('change', (event) => {
      setCodeTheme(event.matches ? hopscotch : coy);
    });
  }, []);

  // function to handle copy content
  const handleCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error(error.message);
      console.log(`Error copying text to clipboard: ${error.message}`);
    }
  }, []);

  // This function will execute for every cpde tag
  const code = ({ children, className, ...rest }) => {
    const match = className?.match(/language-(\w+)/);
    return match ? (
      <>
        <div className='code-block'>
          <div className='p-4 pb-0 font-sans'>{toTitleCase(match[1])}</div>
          <SyntaxHighLighter
            {...rest}
            PreTag='div'
            language={match[1]}
            style={codeTheme}
            customStyle={{
              marginBlock: '0',
              padding: '1px',
            }}
            codeTagProps={{
              style: {
                padding: '14px',
                fontWeight: '600',
              },
            }}
          >
            {children}
          </SyntaxHighLighter>
        </div>
        <div className='bg-light-surfaceContainer dark:bg-dark-surfaceContainer rounded-t-extraSmall rounded-b-medium flex justify-between items-center h-11 font-sans text-bodyMedium ps-4 pe-2'>
          <p>
            Use code
            <a
              className='link ms-1'
              href='https://gemini.google.com/faq#coding'
              target='_blank'
            >
              with caution.
            </a>
          </p>
          <IconBtn
            icon='content_copy'
            size='small '
            title='copy code'
            onClick={handleCopy.bind(null, children)}
          />
        </div>
      </>
    ) : (
      <code className={className}>{children}</code>
    );
  };

  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[,max-content,minmax(0,1fr)] md:gap-5'>
      <figure className='w-9 h-9 grid place-items-center '>
        <img
          src={logoIcon}
          width={40}
          height={40}
          alt='=SmartTalk-AI logo'
        />
      </figure>
      {children}
      {aiResponse && (
        <div className='markdown-content'>
          <Markdown
            remarkPlugins={remarkGfm}
            components={{
              code,
            }}
          >
            {aiResponse}
          </Markdown>
        </div>
      )}
    </div>
  );
};

AiResponse.propTypes = {
  text: PropTypes.string,
};
export default AiResponse;
