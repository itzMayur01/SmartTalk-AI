import { motion } from 'framer-motion';
const Skeleton = () => {
  const skeletonLines = [1, 2, 3];

  // Define Framer motion varients for a skeleton loading animation.
  const skeletonVarient = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const skeletonChildVarient = {
    start: { opacity: 0.5 },
    end: { opacity: 1 },
  };
  return (
    <motion.div
      variants={skeletonVarient}
      initial='start'
      animate='end'
    >
      {skeletonLines.map((item) => (
        <motion.div
          key={item}
          className='skeleton'
          variants={skeletonChildVarient}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Skeleton;
