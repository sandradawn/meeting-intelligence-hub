import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader2 } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ onFileUpload, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Basic validation
    const validTypes = ['text/plain', 'text/vtt'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.vtt') && !selectedFile.name.endsWith('.txt')) {
      alert('Please upload a valid .txt or .vtt file');
      return;
    }
    
    setFile(selectedFile);
    
    // Read file text
    const reader = new FileReader();
    reader.onload = (e) => {
      onFileUpload(e.target.result);
    };
    reader.readAsText(selectedFile);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  if (isProcessing) {
    return (
      <div className="processing-container glass-panel">
        <div className="spinner-wrapper">
          <Loader2 className="spinner" size={48} />
          <div className="glow"></div>
        </div>
        <h3>Mining Intelligence...</h3>
        <p>Extracting decisions and identifying action owners through the transcript.</p>
        
        <div className="processing-steps">
          <div className="step active"><CheckCircle size={16}/> Parsing transcript</div>
          <div className="step active"><CheckCircle size={16}/> Identifying Key Decisions</div>
          <div className="step processing"><Loader2 size={16} className="spin-slow"/> Extracting assignments</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`upload-container glass-panel ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input 
        type="file" 
        id="fileInput" 
        className="file-input" 
        accept=".txt,.vtt"
        onChange={onChange}
      />
      <label htmlFor="fileInput" className="upload-label">
        <div className="upload-icon-wrapper">
          <UploadCloud size={48} className="upload-icon" />
          <div className="icon-glow"></div>
        </div>
        <h3>Upload Meeting Transcript</h3>
        <p>Drag and drop your .txt or .vtt file here, or click to browse.</p>
        <div className="supported-formats">
          <span className="format-badge">.TXT</span>
          <span className="format-badge">.VTT</span>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
