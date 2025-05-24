import React from 'react';
import CameraUploader from './CameraUploader';
import './App.css'
import groqLogo from './assets/PBG.svg'

function App() {
  return (
    <div className="App">
        <div>
        <a href="https://groq.com" target="_blank">
          <img src={groqLogo} className="logo groq" alt="Groq logo" />
        </a>
      </div>
      <CameraUploader />
    </div>
  );
}

export default App;
