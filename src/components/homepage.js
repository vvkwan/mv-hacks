import {GoogleGenerativeAI} from '@google/generative-ai';
import React, {useEffect, useState} from 'react';
import imgSrc from './webcam.js';
import { Buffer } from 'buffer';
// import './IMG_1474.jpg';
// import { readFileSync } from 'node:fs';

const Home = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyA8xpePRCL_zqFgdYZH7BisU79NL5g0JgE');

    const [text, setText] = useState('');
    // const [imageInlineData, setImageInlineData] = useState('');
    // const [aiResponse, setResponse] = useState('');
    // const [loading, setLoading] = useState(false);
    

    // Converts a File object to a GoogleGenerativeAI.Part object.
    // async function fileToGenerativePart(imgSrc) {
    //   const base64EncodedDataPromise = new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => resolve(reader.result.split(',')[1]);
    //     reader.readAsDataURL(imgSrc);
    //   });
    //   return {
    //     inlineData: { data: await base64EncodedDataPromise, mimeType: imgSrc.type },
    //   };
    // }
    
    async function run() {
      // For text-and-images input (multimodal), use the gemini-pro-vision model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
      const prompt = "What's different between these pictures?";
    
    //   const fileInputEl = document.querySelector("input[type=file]");
    //   const imageParts = await Promise.all(
    //     [...fileInputEl.files].map(fileToGenerativePart)
    //   );
    // const img = './IMG_1474.jpg'
    const image = {
        inlineData: {
          data: imgSrc.src = 'data:image/png;base64,iVBORw0K...' /* see JavaScript quickstart for details */,
          mimeType: "image/png",
        },
      };

      const result = await model.generateContent([prompt, image]);
      const response = await result.response;
      const text = response.text();
      setText(text) // so can use jsx?
    }


    useEffect(() => {
      run() 
    }, [text]) 







    // async function fileToGenerativePart(file) {
    //     const base64EncodedDataPromise = new Promise((resolve) => {
    //       const reader = new FileReader();
    //       reader.onloadend = () => resolve(reader.result.split(',')[1]);
    //       reader.readAsDataURL(file);
    //     });
    //     return {
    //       inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    //     };
    //   }

    // async function aiImageRun() {
    //     // const sample_file = genAI.upload_file(path: imgSrc.readAsDataURL,
    //     //                     display_name="Sample drawing")

    //     // const model = genAI.GenerativeModel({model: "gemini-pro-vision"})

    //     // return model.generate_content(["Describe the image with a creative description.", sample_file])

    //     // setLoading(true);
    //     const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    //     const prompt = 'describe this image';
    //     // var fs = require('fs');
    //     const imageParts = await Promise.all(
    //         [...imgSrc].map(fileToGenerativePart)
    //       );
    //     const result = await model.generateContent([prompt, ...imageParts]);
    //     console.log(result.response.text().text);
    // }

    // // async function aiImageRun() {
    // //     setLoading(true);
    // //     setResponse(getResponse());
    // //     const model = genAI.getGenerativeModel({model: 'gemini-pro-vision'});
    // //     const result = await model.generateContent([
    // //         'tell me what in this image', imageInlineData
    // //     ]);

    // //     const response = await result.response;
    // //     const text = response.text();
    // //     setResponse(text);
    // //     setLoading(false);
    // // }
    // // text = aiImageRun()
    // // const text = result.response.text();
    

     return (
        <div>
            <h1>homepage</h1>
            <p>this is Alt Text generator</p>
            <p> {text}
    </p>
        </div>
    );
};

export default Home;