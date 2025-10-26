import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux";
import store from "@/app/store";
import { initOnDOMReady } from '@/utils/initAnimations';
import { ToastContainer } from 'react-toastify';

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

  const root = createRoot(document.getElementById('root'));
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={true}
            closeOnClick
            draggable
            theme="light"
            style={{
              position: 'fixed',
              top: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              pointerEvents: 'none',
              willChange: 'auto'
            }}
            toastStyle={{
              pointerEvents: 'auto',
              transform: 'none',
              willChange: 'auto'
            }}
            bodyStyle={{
              willChange: 'auto'
            }}
          />
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