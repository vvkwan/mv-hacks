import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "./imagereader";

const Home = () => {
    const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});
        const result = await model.generateContent([
            "tell me what in this image", imageInlineData
        ]);

        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick = () => {
        aiImageRun();
    }
    
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

     return (
        <div>
            <h1>homepage</h1>
            <p>this is Alt Text generator</p>
        </div>
    );
};

export default Home;