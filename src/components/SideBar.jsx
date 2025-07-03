import { NavLink, useLoaderData, useParams, useSubmit } from 'react-router-dom';
import { ExtendedFab, IconBtn } from './Button';
import Logo from './Logo';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import deleteConversation from '../utils/deleteConversation';

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  // Extract conversations form loader data if it exists.
  const {
    conversations: { documents: conversationData },
  } = useLoaderData() || {};

  // Get a refrence to the useSubmit function for submitting forms.
  const submit = useSubmit();

  // Extract the conversationid from the url parameter
  const { conversationId } = useParams();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`sidebar ${isSidebarOpen ? 'active' : ''}`}
      >
        <div className='sidebar-inner'>
          <div className='h-16 grid items-center px-4 mb-4'>
            <Logo />
          </div>
          <ExtendedFab
            text='New chat'
            href='/'
            classes='mb-4'
            onClick={toggleSidebar}
            disabled={!conversationId}
          />
          <div
            className='overflow-y-auto -me-2 pe-1
          '
          >
            <p className='text-titleSmall h-9 grid items-center px-4'>Recent</p>
            <nav>
              {conversationData.map((item) => (
                <div
                  key={item.$id}
                  className='relative group'
                >
                  <NavLink
                    to={item.$id}
                    className='nav-link'
                    title={item.title}
                    onClick={toggleSidebar}
                  >
                    <span className='material-symbols-rounded icon-small'>
                      Chat_bubble
                    </span>
                    <span className='truncate'>{item.title}</span>
                    <div className='state-layer'></div>
                  </NavLink>
                  <IconBtn
                    icon='delete'
                    size='small'
                    classes='absolute top-1/2 right-1.5 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 group:focus-within:opacity-100 hidden lg:grid'
                    title='delete'
                    onClick={() => {
                      deleteConversation({
                        id: item.$id,
                        title: item.title,
                        submit,
                      });
                    }}
                  />
                </div>
              ))}
            </nav>
          </div>

          <div
            className='mt-4 h-14 px-4 grid items-center text-labelLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant
          border-light-surfaceContainerHigh
          dark:border-dark-surfaceContainerHigh truncate '
          >
            &copy; 2025 Thakur Sahab
          </div>
        </div>
      </motion.div>
      <div
        className={`overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};
SideBar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};
export default SideBar;
