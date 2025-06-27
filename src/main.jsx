// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes.jsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AppRoutes />
  </React.StrictMode>
);