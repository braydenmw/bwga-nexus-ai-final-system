import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Debug logging
console.log('Starting BWGA Nexus AI application...');
console.log('React version:', React.version);
console.log('Current URL:', window.location.href);

const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

if (!rootElement) {
  console.error("Could not find root element to mount to");
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Could not find root element to mount React application</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  console.log('Creating React root...');
  const root = ReactDOM.createRoot(rootElement);

  console.log('Rendering React application...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log('React application rendered successfully');
} catch (error) {
  console.error('Error rendering React application:', error);
  document.body.innerHTML = `<div style="color: red; padding: 20px;">Error rendering React application: ${error.message}</div>`;
}

// Add basic error logging for debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});