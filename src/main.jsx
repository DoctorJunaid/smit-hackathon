import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'
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
          {createPortal(
            <ToastContainer
              position="top-center"
              autoClose={2000}
              newestOnTop={true}
              closeOnClick
              draggable
              theme="light"
              containerId="main-toast"
              style={{ zIndex: 99999 }}
              containerClassName="toast-root"
            />,
            document.body
          )}
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
