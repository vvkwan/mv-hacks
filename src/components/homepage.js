import React, { useState, useEffect, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImgContext } from "../Context";
import { getBase64 } from '../imageHelper';

const Home = () => {
    const { imgSrc, setImgSrc } = useContext(ImgContext);
    const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);
    const [data, setResponse] = useState('');
    const [image, setImage] = useState('');
    const [imageInineData, setImageInlineData] = useState('');

    async function aiImageRun() {
        setResponse('');
        const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});
        // const binaryData = atob(imgSrc);
        // const image = JSON.parse(binaryData);
        const result = await model.generateContent([
            "tell me what in this image", imgSrc
        ]);

        //embedded
        const response = await result.response;
        const text = response.text();
        setResponse(text);
    }

    useEffect(() => {
        aiImageRun()
    }, []);
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