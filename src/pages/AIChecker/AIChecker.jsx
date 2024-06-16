import React, { useState } from 'react';
import './aichecker.css';

const AIChecker = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleScan = () => {
    // Add logic for scanning text or file for plagiarism
    console.log('Scanning for plagiarism...');
  };

  return (
    <div className="ai-checker">
      <h1 className="ai-checker__title">AI Checker</h1>
      <p className="ai-checker__description">
        AI Plagiarism checker detects plagiarism in your text and checks for other writing issues.
      </p>
      <textarea
        className="ai-checker__textarea"
        placeholder="Enter text or upload your file to check for plagiarism..."
        value={text}
        onChange={handleTextChange}
      />
      <div className="ai-checker__buttons">
        <button className="ai-checker__button" onClick={handleScan}>Scan for plagiarism</button>
        <input className="ai-checker__file-input" type="file" onChange={handleFileChange} />
      </div>
      <p className="ai-checker__char-count">{text.length}/10000</p>
    </div>
  );
}

export default AIChecker;
