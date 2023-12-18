import React from 'react';
import './Loading.css'; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Processing the text...</p>
    </div>
  );
};

export default Loading;