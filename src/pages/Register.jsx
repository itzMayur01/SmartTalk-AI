import { Link, Form, useNavigate, useNavigation } from 'react-router-dom';
import { logoDark, logoLight, banner, banner1 } from '../assests/assests';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { Spinner, LinearProgress } from '../components/Spinner';
import { useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

const Register = () => {
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

  const [formErrors, setFormErrors] = useState({});
  const actionData = useActionData(); // Server-side errors returned from action function

  const validateInputs = (formData) => {
    const errors = {};
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    // Client-Side Validation Rules
    if (!name.trim()) {
      errors.name = 'Name is required.';
    } else if (name.length < 4) {
      errors.name = 'Name must be at least 4 characters.';
    }
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/.test(email)
    ) {
      errors.email = 'Email must be a valid Gmail, Yahoo, or Outlook address.';
    }

    if (!password.trim()) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const errors = validateInputs(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      e.preventDefault(); // Prevent submission if there are client-side errors
    }
  };

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
      <PageTitle title='Create an account' />
      <div className='relative w-screen h-dvh p-2 grid drid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2 '>
        <div className='flex flex-col p-4'>
          <Logo classes='mx-auto mb-auto lg:mx-0' />

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto '>
            <h2
              className='text-displaySmall font-semibold text-light-onBackground
            dark:text-dark-onBackground text-center'
            >
              Create an account
            </h2>
            <p className='text-bodyLarge text-centertext-light-onBackground dark:text-dark-onBackground mt-1 mb-5 text-centr px-2'>
              Register today and gain access to powerful tools that will
              supercharge your ideas.
            </p>
            {actionData?.error && (
              <p className='text-red-500'>{actionData.error}</p>
            )}
            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
              onSubmit={handleSubmit}
            >
              <TextField
                type='text'
                name='name'
                label='Full name'
                placeholder='Full name'
                required={true}
                autoFocus={true}
                helperText={formErrors.name}
                fieldClasses={formErrors.name ? 'border-red-500' : ''}
              />

              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                required={true}
                helperText={formErrors.email}
                fieldClasses={formErrors.email ? 'border-red-500' : ''}
              />

              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your password'
                required={true}
                helperText={formErrors.password}
                fieldClasses={formErrors.password ? 'border-red-500' : ''}
              />

              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <Spinner size='small' />
                ) : (
                  'Create account'
                )}
              </Button>
            </Form>

            <p className='text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4'>
              Already have an account?
              <Link
                to='/login'
                className='link text-labelLarge inline-block ms-1 text-light-onSurface dark:text-dark-onSurface'
              >
                Sign in
              </Link>
            </p>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2024 Mayur. All right reserved
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

export default Register;
