import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './routers/routes';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
