import React, { useState } from "react";
import "./aichecker.css";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

const AIChecker = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleScan = () => {
    // Add logic for scanning text or file for plagiarism
    console.log("Scanning for plagiarism...");
  };

  return (
    <div className="ai-checker">
      <div className="ai-checker__header">
        <h1 className="ai-checker__title">AI Checker</h1>
        <p className="ai-checker__description">
          AI Plagiarism checker detects plagiarism in your text and checks for
          other writing issues.
        </p>
      </div>
      <div className="ai-checker__textarea-container">
        <textarea
          className="ai-checker__textarea"
          placeholder="Enter text or upload your file to check for plagiarism..."
          value={text}
          onChange={handleTextChange}
        />
        <div className="ai-checker__buttons">
          <button onClick={handleScan}>Scan for plagiarism</button>
          <Upload {...props} className="">
            <Button icon={<UploadOutlined />} className="ai-checker__buttons__noBack">
              Upload file
            </Button>
          </Upload>
          {/* <button className="button__nobackground" onClick={handleScan}>⇧  Upload file</button> */}
        </div>
      </div>
      <p className="ai-checker__char-count">{text.length}/10000</p>
    </div>
  );
};

export default AIChecker;
