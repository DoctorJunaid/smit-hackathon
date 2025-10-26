import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux";
import store from "@/app/store";
import { initOnDOMReady } from '@/utils/initAnimations';

// Function to check if stylesheets are loaded
const areStylesheetsLoaded = () => {
  const styleSheets = document.styleSheets;
  return Array.from(styleSheets).every(sheet => {
    try {
      return sheet.cssRules || sheet.rules;
    } catch (e) {
      return false;
    }
  });
};

// Wait for stylesheets and DOM to be ready
const renderApp = () => {
  if (!areStylesheetsLoaded()) {
    requestAnimationFrame(renderApp);
    return;
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
  
  // Initialize animations after React has mounted
  requestAnimationFrame(() => {
    initOnDOMReady();
  });
};

// Start the render process
renderApp();
