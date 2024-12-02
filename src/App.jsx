import PageTitle from './components/PageTitle';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import TopAppBar from './components/TopAppBar';
import SideBar from './components/SideBar';
import { useToggle } from './hooks/useToggle';
import Greetings from './pages/Greetings';
import PromptField from './components/PromptField';
import {
  Outlet,
  useActionData,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { usePromptPreloader } from './hooks/usePromptPreloader';

const App = () => {
  //Get the URL parameters.
  const params = useParams();
  const navigation = useNavigation();

  // Get the data passed from a form action
  const actionData = useActionData();

  /**
   * Create a refrence to an HTML element, likley used to interact with the chat history
   */
  const chatHistoryRef = useRef();

  /**
   * Access the prompt preloader state,
   * particularly the value for prompt preloading
   */
  const { promptPreloaderValue } = usePromptPreloader();

  /**
   *  This useEffect hook is triggered whenever the 'promptPreLoaderValue' or 'chatHistoryRef' changes.
   * Inside the hook, we get the current HTML element refrenced by 'chatHistoryRef'.
   * Then, we check if 'promptPreLoaderValue' is true, indicating that a new message is being loaded.
   * If its true, we smoothly scroll the chat history to the bottom.
   * This insures that the latest message is always visible after loading new content.
   */
  useEffect(() => {
    const chatHistory = chatHistoryRef.current;
    if (promptPreloaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistoryRef, promptPreloaderValue]);

  // Show toast notification after deleting a conversation
  useEffect(() => {
    if (actionData?.conversationTitle) {
      toast.success(`Deleted '${actionData.conversationTitle} conversation.`);
    }
  }, [actionData]);

  const [isSidebarOpen, toggleSidebar] = useToggle();

  /**
   * check if the current navigation state is 'loading' and if there is no form data associated with the navigation.
   * This condition typically signifies a normal page load,
   * where the page is loading for the for the first time or is being reloaded without submitting a form
   */
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;
  return (
    <>
      <ToastContainer
        toastClassName='custom-toast' // Custom class for the toast
        bodyClassName='custom-body' // Custom class for the toast body
        progressClassName='custom-progress' // Custom class for the progress bar
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <PageTitle title='SmartTalk AI - chat to supercharge your ideas' />

      <div className='lg:grid lg:grid-cols-[320px,1fr]'>
        {/*sidebar */}
        <SideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className='h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]'>
          {/*Top app bar */}
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* Main content*/}

          <div
            ref={chatHistoryRef}
            className='px-5 pb-5 flex flex-col overflow-y-auto'
          >
            <div className='max-w-[840px] w-full mx-auto grow'>
              {isNormalLoad ? null : params.conversationId ? (
                <Outlet /> // Conversation
              ) : (
                <Greetings />
              )}
            </div>
          </div>

          {/* Prompt field*/}

          <div className='bg-light-background dark:bg-dark-background'>
            <div className='max-w-[870px] px-5 w-full mx-auto'>
              <PromptField />
              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
                className='text-bodySmall text-center text-light-onSurfaceVariant
                dark:text-dark-onSurfaceVariant p-3'
              >
                SmartTalk-AI may display inaccurate info, including about
                people, so double -check its responses.
                <a
                  href='https://support.google.com/gemini?p=privacy_notice'
                  target='blank'
                  className='inline underline ms-1'
                >
                  Your privacy & Gemini Apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
