import { Form, useNavigation } from 'react-router-dom';
import { banner1 } from '../assests/assests';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { Spinner, LinearProgress } from '../components/Spinner';
import { useActionData } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

const ResetPassword = () => {
  //Get navigation state e.g loading/submiting etc
  const navigation = useNavigation();
  //console.log(navigation.state);

  //Get errror data from form submission using useActionData fromm react router
  const error = useActionData();

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message); // Display error toast
    }
  }, [error]); // Trigger useEffect whenever `error` changes

  return (
    <>
      <ToastContainer
        toastClassName='custom-toast' // Custom class for the toast
        bodyClassName='custom-body' // Custom class for the toast body
        progressClassName='custom-progress' // Custom class for the progress bar
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <PageTitle title='Reset password' />
      <div className='relative w-screen h-dvh p-2 grid drid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2 '>
        <div className='flex flex-col p-4'>
          <Logo classes='mx-auto mb-auto lg:mx-0' />

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto '>
            <h2
              className='text-displaySmall font-semibold text-light-onBackground
            dark:text-dark-onBackground text-center'
            >
              Set a new password
            </h2>
            <p className='text-bodyLarge text-center  text-light-onBackground dark:text-dark-onBackground mt-1 mb-5 text-centr px-2'>
              Please choose a password that hasn&apos;t been used before. Must
              be at least 8 characters.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='New password'
                required={true}
                autofocus={true}
              />

              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <Spinner size='small' />
                ) : (
                  'Reset password'
                )}
              </Button>
            </Form>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2025 Thakur Sahab. All right reserved
          </p>
        </div>
        <div className='hidden img-box lg:block lg:relative lg:rounded-large lg:overflow-hidden'>
          <img
            src={banner1}
            alt='banner'
            className='img-cover'
          />
        </div>
      </div>
      <AnimatePresence>
        {navigation.state === 'loading' && (
          <LinearProgress classes='absolute top-0 left-0 right-0' />
        )}
      </AnimatePresence>
    </>
  );
};

export default ResetPassword;
