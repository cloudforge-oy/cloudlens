import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';

const CameraUploader = () => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Capture photo from webcam
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  // Send image to API
    const uploadImage = async () => {
    if (!imgSrc) return;

    setIsLoading(true);
    try {
        const base64Data = imgSrc.split(',')[1];
        
        const response = await axios.post(
        'http://localhost:5000/api/upload', 
        { image: base64Data },
        { headers: { 'Content-Type': 'application/json' } }
        );

        setApiResponse(response.data.message);
    } catch (error) {
        // ... error handling
    } finally {
        setIsLoading(false);
    }
    };

  // Reset camera and captured image
  const retakePhoto = () => {
    setImgSrc(null);
    setApiResponse('');
  };

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const cameraMode = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

  const videoConstraints = {
    facingMode: "user" // or "environment" for rear camera
  };

  return (
    <div style={styles.container}>
      <h1>CloudLens</h1>
      
      {!imgSrc ? (
        <div style={styles.cameraContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
          ...videoConstraints,
          facingMode
        }}
            style={styles.webcam}
          />
          <button onClick={capture} style={styles.button}>
            Capture Photo
          </button>
          <button onClick={cameraMode} style={styles.button}>
            Change Camera
          </button>
        </div>
      ) : (
        <div style={styles.previewContainer}>
          <img src={imgSrc} alt="Captured" style={styles.previewImage} />
          <div style={styles.buttonGroup}>
            <button onClick={retakePhoto} style={styles.button}>
              Retake
            </button>
            <button 
              onClick={uploadImage} 
              style={styles.button}
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Describe Image'}
            </button>
          </div>
        </div>
      )}
      
      {apiResponse && (
        <div style={styles.response}>
          <p>{apiResponse}</p>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  cameraContainer: {
    margin: '20px 0'
  },
  webcam: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  previewContainer: {
    margin: '20px 0'
  },
  previewImage: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  button: {
    padding: '10px 20px',
    backgroundImage: 'linear-gradient(to right, #439bfd, #b200e8)',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  response: {
    marginTop: '20px',
    padding: '10px',
    color: '#121212',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  }
};

export default CameraUploader;
