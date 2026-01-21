import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/inter/400.css"; // Regular
import "@fontsource/inter/700.css"; // Bold
import "@fontsource/inter/900.css"; // Black
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
        <App/>
    </AuthProvider>
  
)
