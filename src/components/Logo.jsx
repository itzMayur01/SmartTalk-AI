import React from 'react';
import { Link } from 'react-router-dom';
import { logoDark, logoLight } from '../assests/assests';
import PropTypes from 'prop-types';
const Logo = ({ classes = '' }) => {
  return (
    <Link
      to='/'
      className={`min-w-max max-w-max ${classes}`}
    >
      <img
        src={logoLight}
        alt='smartTalk-AI logo'
        width={133}
        height={24}
        className='dark:hidden'
      />
      <img
        src={logoDark}
        alt='smartTalk-AI logo'
        width={133}
        height={24}
        className='hidden dark:block'
      />
    </Link>
  );
};

Logo.propTypes = {
  classes: PropTypes.string,
};

export default Logo;
