import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
const Spinner = ({ size = '', classses = '' }) => {
  return (
    <div
      role='progressbar'
      className={`circular-progress ${size} ${classses}`}
    ></div>
  );
};

Spinner.PropTypes = {
  classses: PropTypes.string,
  size: PropTypes.string,
};

/**
 * linear progres bar
 */

const LinearProgress = ({ classes = '' }) => {
  //Defines Framer motion variants for animating aprogress bar and an active indicator
  const progressbarVarient = {
    start: { scaleY: 0 },
    end: {
      scaleY: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.2,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
    exit: {
      scaleY: 1,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
  };
  const activeIndicatorVarient = {
    start: { translateX: '-100%' },
    end: { translateX: '100%' },
  };
  return (
    <motion.div
      role='progessbar'
      variants={progressbarVarient}
      initial='start'
      animate='end'
      exit='exit'
      className={`linear-progress ${classes}`}
    >
      <motion.div
        variants={activeIndicatorVarient}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: [0.2, 0, 0, 1],
        }}
        className='active-indicator'
      ></motion.div>
    </motion.div>
  );
};

LinearProgress.propTypes = {
  classses: PropTypes.string,
};
export { Spinner, LinearProgress };
