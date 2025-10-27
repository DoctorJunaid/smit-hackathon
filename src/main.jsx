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
  return new Promise((resolve) => {
    const styleSheets = document.styleSheets;
    
    if (Array.from(styleSheets).every(sheet => {
      try {
        return sheet.cssRules || sheet.rules;
      } catch (e) {
        return false;
      }
    })) {
      resolve();
    } else {
      const observer = new MutationObserver((mutationsList, observer) => {
        if (Array.from(document.styleSheets).every(sheet => {
          try {
            return sheet.cssRules || sheet.rules;
          } catch (e) {
            return false;
          }
        })) {
          observer.disconnect();
          resolve();
        }
      });
      
      observer.observe(document.head, {
        childList: true,
        subtree: true
      });
    }
  });
};

// Wait for stylesheets and DOM to be ready
const renderApp = async () => {
  await areStylesheetsLoaded();
  document.documentElement.classList.add('styles-loaded');
  
  const root = createRoot(document.getElementById('root'));
  
  root.render(
    <StrictMode>
        <Provider store={store}>
      <BrowserRouter>
          <App />
          </BrowserRouter><ToastContainer
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
      
    </StrictMode>
  );
  
  // Initialize animations after React has mounted
  requestAnimationFrame(() => {
    initOnDOMReady();
  });
};

// Start the render process
renderApp();