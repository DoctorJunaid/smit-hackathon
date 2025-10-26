import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux";
import store from "@/app/store";
import { initOnDOMReady } from '@/utils/initAnimations';
import { ToastContainer } from 'react-toastify';

// Wrapper component to handle toast after styles load
function AppWrapper() {
  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    // Force check multiple times to ensure styles are loaded
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkStyles = () => {
      attempts++;
      
      // Check if both custom styles and toastify styles exist
      const hasToastifyStyles = Array.from(document.styleSheets).some(sheet => {
        try {
          return sheet.href && sheet.href.includes('ReactToastify');
        } catch (e) {
          return false;
        }
      });

      const hasCustomStyles = getComputedStyle(document.documentElement).getPropertyValue('--color-background');

      if ((hasToastifyStyles || attempts >= maxAttempts) && hasCustomStyles) {
        setStylesLoaded(true);
        // Initialize animations after everything is loaded
        requestAnimationFrame(() => {
          initOnDOMReady();
        });
      } else if (attempts < maxAttempts) {
        setTimeout(checkStyles, 100);
      } else {
        // Fallback: load anyway after max attempts
        setStylesLoaded(true);
        requestAnimationFrame(() => {
          initOnDOMReady();
        });
      }
    };

    // Start checking after a brief delay
    setTimeout(checkStyles, 50);
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          {stylesLoaded && (
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
              toastClassName={() => 
                "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white shadow-lg mb-2"
              }
              toastStyle={{
                pointerEvents: 'auto',
                transform: 'none',
                willChange: 'auto',
                position: 'relative',
                margin: '0 auto 8px auto'
              }}
              bodyStyle={{
                willChange: 'auto'
              }}
            />
          )}
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('root'));
    root.render(<AppWrapper />);
  });
} else {
  const root = createRoot(document.getElementById('root'));
  root.render(<AppWrapper />);
}