import Webcam from "react-webcam";
import React, {useState, useRef, useCallback } from "react";

const WebcamCapture = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [currentState, setCurrentState] = useState("capturing");
    const [imgSrc, setImgSrc] = useState(null);
    /**
     const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
     */
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
    const webCamButton = () => {
        if (currentState === "capturing") {
            capture();
            setCurrentState("screenshot");
        } else if (currentState === "screenshot") {
            setCurrentState("capturing");
        }
      };
    
    return (
      <>
      <button onClick={webCamButton}>
      {currentState === "capturing" ? (
          <Webcam
            audio={false}
            mirrored={true}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
          />
        ) : (
          <img src={imgSrc} />
        )}
        </button>
      </>
    );
  };
  export default WebcamCapture;