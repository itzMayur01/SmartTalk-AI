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

const ResetLink = () => {
  //Get navigation state e.g loading/submiting etc
  const navigation = useNavigation();
  //console.log(navigation.state);

  //Get errror data from form submission using useActionData fromm react router
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.ok) {
      toast.success(actionData.message); // Display succes toast
    } else if (actionData?.message) {
      toast.error(actionData.message);
    }
  }, [actionData, toast]); // Trigger useEffect whenever `error` changes

  return (
    <>
      <ToastContainer
        toastClassName='custom-toast' // Custom class for the toast
        bodyClassName='custom-body' // Custom class for the toast body
        progressClassName='custom-progress' // Custom class for the progress bar
        position='bottom-left'
        autoClose={7000}
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
              Forget your password?
            </h2>
            <p className='text-bodyLarge text-center  text-light-onBackground dark:text-dark-onBackground mt-1 mb-5 text-centr px-2'>
              Enter your email, and we&apos;ll send a password reset link.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >
              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                helperText='The verification link sent to your email address will be valid for 1 hour'
                required={true}
                autoFocus={true}
              />

              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <Spinner size='small' />
                ) : (
                  'Get link'
                )}
              </Button>
            </Form>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2024 Mayur. All right reseerved
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

export default ResetLink;
