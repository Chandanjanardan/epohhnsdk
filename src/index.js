import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import Loading from './Loading'; // Update the import path
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Expose the App component globally
window.MyReactSDK = {
  App: App,
};