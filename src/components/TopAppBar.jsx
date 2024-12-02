import React from 'react';
import { IconBtn } from './Button';
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Avatar from './Avatar';
import Menu from './Menu';
import MenuItems from './MenuItems';
import { LinearProgress } from './Spinner';
import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../hooks/useToggle';
import logout from '../utils/logout';
import Logo from './Logo';
import PropTypes from 'prop-types';
import deleteConversation from '../utils/deleteConversation';
import { param } from 'framer-motion/client';

const TopAppBar = ({ toggleSidebar }) => {
  //-useNavigation: Provides navigation state (Loading,idle,submitting)
  const navigation = useNavigation();
  const navigate = useNavigate();

  /**
   * -Conversation: Array containing all conversation data.
   * -user: User data for the currently logged-in user
   */
  const { conversations, user } = useLoaderData();

  /**
   *  obtain the useSubmit hook for handling form submissions:
   * -submit: function for submitting forms and triggering server side actions
   */
  const submit = useSubmit();

  /**
   * Params object containing URL parameters, including the conversationid
   */
  const params = useParams();

  /**
   * use a custom hook to manage the menu's show state.
   * 'showMenu' holds the current state,
   * and 'setShowMenu' is a function to toggle the menu
   */
  const [showMenu, setShowMenu] = useToggle();

  /*
   * Check if the current navigation state is 'loading'
   and if there is no form data associated with the navigation.
   
   * This condition typically signifies a normal page load,
   where the page is loading for the first time or is being reloaded without submitiing a form
  */
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <header className='relative flex justify-between items-center h-16 px-4 '>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />

        <Logo classes='lg:hidden' />
      </div>

      {params.conversationId && (
        <IconBtn
          icon='delete'
          classes='ms-auto me-1 lg:hidden'
          onClick={() => {
            //Find the current conversation title
            const { title } = conversations.documents.find(
              ({ $id }) => params.conversationId === $id,
            );
            deleteConversation({
              id: params.conversationId,
              title,
              submit,
            });
          }}
        />
      )}

      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name} />
        </IconBtn>
        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItems
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>
      <AnimatePresence>
        {isNormalLoad && (
          <LinearProgress classes='absolute top-full left-0 right-0 z-10' />
        )}
      </AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default TopAppBar;
