import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Sign } from './signin.jsx';
import { Results } from './results.jsx';
import { Data } from './data.jsx';

import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Input } from './questions.jsx';
// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/questions",
    element: <Input/>
  },
  {
    path: "/signin",
    element: <Sign/>
  },
  {
    path: "/vocabulary",
    element: <Results/>
  },
  {
    path: "/data",
    element: <Data/>
  }
]);

// Create the root and render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
