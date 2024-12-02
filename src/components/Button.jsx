import PropTypes from 'prop-types';
import { Children } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Button = ({
  classes = '',
  varient = 'filled',
  color = 'primary',
  children,
  ...rest
}) => {
  return (
    <button
      className={`btn ${varient} ${color} ${classes}`}
      {...rest}
    >
      {children}
      <div className='state-layer'></div>
    </button>
  );
};

Button.propTypes = {
  classes: PropTypes.string,
  varient: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string,
};
/**
 * Icon button
 */
export const IconBtn = ({
  classes = '',
  icon,
  size = '',
  children,
  ...rest
}) => {
  return (
    <motion.button
      className={`icon-btn ${size} ${classes}`}
      {...rest}
    >
      {children}
      {!children && (
        <span className={`material-symbols-rounded icon`}>{icon}</span>
      )}
      <div className='state-layer'></div>
    </motion.button>
  );
};

IconBtn.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
};

/**}
 * Extened fab
 */

export const ExtendedFab = ({ href, text, classes = '', ...rest }) => {
  return (
    <Link
      to={href}
      className={`extended-fab ${classes}`}
      {...rest}
    >
      <span className='material-symbols-rounded'>add</span>
      <span className='truncate'>{text}</span>
      <div className='state-layer'></div>
    </Link>
  );
};

ExtendedFab.propTypes = {
  classes: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
