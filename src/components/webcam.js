import Webcam from "react-webcam";
import React, {useState, useRef, useCallback, useContext} from "react";
import { ImgContext } from "../Context";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [currentState, setCurrentState] = useState("capturing");
  const { imgSrc, setImgSrc } = useContext(ImgContext);

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
          setImgSrc(null);
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
            screenshotFormat="image/png"
            width={1280}
          />
        ) : (
          <img src={imgSrc} alt= "public/logo192.png" />
        )}
        </button>
      </>
    );
  };
  export default WebcamCapture;