import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux";
import store from "@/app/store";
import { initOnDOMReady } from '@/utils/initAnimations';

// Initialize animations
initOnDOMReady();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
    <App />
        </Provider>
    </BrowserRouter>
  </StrictMode>,
)
