import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

export default function ToastPortal() {
  const portalRoot = useRef(null);

  useEffect(() => {
    // Create a completely separate container outside React root
    const toastRoot = document.createElement('div');
    toastRoot.id = 'toast-portal-root';
    toastRoot.style.cssText = `
      position: fixed !important;
      top: 1rem !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      z-index: 99999 !important;
      pointer-events: none !important;
      width: auto !important;
      max-width: 500px !important;
    `;
    
    // Add data attribute to exclude from GSAP
    toastRoot.setAttribute('data-gsap-exclude', 'true');
    
    document.body.appendChild(toastRoot);
    portalRoot.current = toastRoot;

    // Force position on every frame
    let animationFrameId;
    const forcePosition = () => {
      if (toastRoot && toastRoot.parentElement) {
        toastRoot.style.position = 'fixed';
        toastRoot.style.top = '1rem';
        toastRoot.style.left = '50%';
        toastRoot.style.transform = 'translateX(-50%)';
        toastRoot.style.zIndex = '99999';
      }
      animationFrameId = requestAnimationFrame(forcePosition);
    };
    forcePosition();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (toastRoot && toastRoot.parentElement) {
        toastRoot.parentElement.removeChild(toastRoot);
      }
    };
  }, []);

  if (!portalRoot.current) return null;

  return createPortal(
    <ToastContainer
      position="top-center"
      autoClose={2000}
      newestOnTop={true}
      closeOnClick
      draggable
      theme="light"
      containerId="isolated-toast"
      enableMultiContainer
      style={{
        position: 'relative',
        width: '100%',
        pointerEvents: 'none'
      }}
      toastStyle={{
        pointerEvents: 'auto',
        margin: '0 auto 8px auto',
        background: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        minHeight: '64px',
        padding: '8px'
      }}
    />,
    portalRoot.current
  );
}