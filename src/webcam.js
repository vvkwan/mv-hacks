import Webcam from "react-webcam";
import React, {useRef, useCallback } from "react";

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    /**
     const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
     */
    const currentState = 'capturing'
    const capture = () => {
        if (currentState == 'capturing') {
          useCallback(
            () => {
              const imageSrc = webcamRef.current.getScreenshot();
            },
            [webcamRef]
          );
          currentState = 'screenshot';
        } else if (currentAction == 'screenshot') {
          currentState = 'capturing';
        }
      };
    return (
      <>
      <button onClick={capture}>
        <Webcam
          audio={false}
          mirrored={true}
          height={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
        />
        </button>
      </>
    );
  };
  export default WebcamCapture;