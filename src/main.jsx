import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: {
      /*Add Routes Here*/
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
