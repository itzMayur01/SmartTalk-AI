import { useLoaderData, useLocation } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { easeOut, motion } from 'framer-motion';
import UserPrompt from '../components/UserPrompt';
import AiResponse from '../components/AiResponse';
import PromptPreLoader from '../components/PromptPreLoader';
import { usePromptPreloader } from '../hooks/usePromptPreloader';
const Conversation = () => {
  /**
   * Extract the conversation data (title and chats) from loader data,
   * handling potential undefimed values using optional chaining
   */
  const {
    conversation: { title, chats },
  } = useLoaderData() || {};

  const { promptPreloaderValue } = usePromptPreloader();

  // obtain the current URL LOCATION info using useLocation hook
  const location = useLocation();

  return (
    <>
      <PageTitle title={`${title} | SmartTalk-AI`} />

      <motion.div
        className='max-w-[700px] mx-auto !will-change-auto'
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: easeOut }}
      >
        {chats.map((chat) => (
          <div key={chat.$id}>
            {/* User Prompt */}
            <UserPrompt text={chat.user_prompt} />

            {/* AiResponse  */}
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </motion.div>
      {promptPreloaderValue && (
        <PromptPreLoader promptValue={promptPreloaderValue} />
      )}
    </>
  );
};

export default Conversation;
