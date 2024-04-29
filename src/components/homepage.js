import React, { useState, useEffect, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImgContext } from "../Context";
import { getBase64 } from '../imageHelper';

const Home = () => {
    const { imgSrc, setImgSrc } = useContext(ImgContext);
    const genAI = new GoogleGenerativeAI('AIzaSyA8xpePRCL_zqFgdYZH7BisU79NL5g0JgE');
    const [data, setResponse] = useState('');

    async function fileToGenerativePart(imgSrc) {
        const base64EncodedDataPromise = new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(imgSrc);
        });
        return {
          inlineData: { data: await base64EncodedDataPromise, mimeType: imgSrc.type },
        };
      }
      
      async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = "tell me what in this image";
      
      const image = {
          inlineData: {
            data: imgSrc,
            mimeType: "image/png",
          },
        };
  
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
      }
  
  
      useEffect(() => {
        run() 
      }, [data]) 
    /*
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        getBase64(file).then((result) => {
            setImage(result);
        }).catch(e => console.log(e))

        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
        
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }
    */
    
    return (
        <div>
        <p>Generated Text {data}</p>
        </div>
      );
};

export default Home;