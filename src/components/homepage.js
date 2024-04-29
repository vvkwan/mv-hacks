import React, { useState, useEffect, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImgContext } from "../Context";
import { getBase64 } from '../imageHelper';

const Home = () => {
    const { imgSrc, setImgSrc } = useContext(ImgContext);
    const genAI = new GoogleGenerativeAI('AIzaSyA8xpePRCL_zqFgdYZH7BisU79NL5g0JgE');
    const [data, setResponse] = useState('');    

      async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = "tell me what in this image";
      
        console.log("imgSrc", imgSrc);
        let tempImageObject = {
            inlineData: {
            data: imgSrc.substring(imgSrc.indexOf(",")+1),
            mimeType: imgSrc.substring(imgSrc.indexOf(":")+1, imgSrc.indexOf(";"))
             }
        }
        console.log("tempImageObject", tempImageObject);

        const result = await model.generateContent([prompt, tempImageObject]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
      }

      useEffect(() => {
        // Check if imgSrc has changed
        if (imgSrc) {
          run();
        }
      }, [imgSrc]) 

      useEffect(() => {
        if(data){
        let utterance = new SpeechSynthesisUtterance(data);
        speechSynthesis.speak(utterance);
        }
      }, [data])
  
    return (
        <div>
        <p>Generated Text: {data}</p>
        </div>
      );
};

export default Home;