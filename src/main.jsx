import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux";
import store from "@/app/store";
import { initOnDOMReady } from '@/utils/initAnimations';
import { Toaster } from 'react-hot-toast';

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
          </BrowserRouter>
                    <Toaster 
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              duration: 2000,
              style: {
                background: 'white',
                color: '#363636',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '8px',
                padding: '12px 24px',
              },
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