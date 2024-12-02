import {
  Link,
  Form,
  useNavigate,
  useNavigation,
  useLocation,
} from 'react-router-dom';
import { logoDark, logoLight, banner, banner1 } from '../assests/assests';
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

const Login = () => {
  //Get navigation state e.g loading/submiting etc
  const navigation = useNavigation();
  //console.log(navigation.state);

  //Get errror data from form submission using useActionData fromm react router
  const error = useActionData();

  //useLocation hook reads the query parameter
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the 'success' query parameter is present
    const params = new URLSearchParams(location.search);

    if (params.get('success') === 'true') {
      toast.success('Password reset successful! Please log in.');
    }

    if (params.has('success')) {
      params.delete('success');
      const newUrl = `${location.pathname}?${params.toString()}`;
      if (newUrl !== location.search) {
        navigate(newUrl, { replace: true });
      }
    }

    if (error?.message) {
      toast.error(error.message); // Display error toast
    }
  }, [error, location, navigate]);

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
      <PageTitle title='Login' />
      <div className='relative w-screen h-dvh p-2 grid drid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2 '>
        <div className='flex flex-col p-4'>
          <Logo classes='mx-auto mb-auto lg:mx-0' />

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto '>
            <h2
              className='text-displaySmall font-semibold text-light-onBackground
            dark:text-dark-onBackground text-center'
            >
              Welcome back to SmartTalk-AI
            </h2>
            <p className='text-bodyLarge text-center  text-light-onBackground dark:text-dark-onBackground mt-1 mb-5 text-centr px-2'>
              Enter your SmartTalk-AI account details.
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
                required={true}
                autoFocus={true}
              />

              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your password'
                required={true}
              />
              <div className='text-right'>
                <Link
                  to='/reset-link'
                  className='link text-labelLarge inline-block'
                >
                  Forget password?
                </Link>
              </div>

              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <Spinner size='small' />
                ) : (
                  'Sign in'
                )}
              </Button>
            </Form>

            <p className='text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4'>
              Don&apos;t have an account?
              <Link
                to='/register'
                className='link text-labelLarge inline-block ms-1 text-light-onSurface dark:text-dark-onSurface'
              >
                Create an account
              </Link>
            </p>
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

export default Login;
