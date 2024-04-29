import React, { useState, useEffect, useContext } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from './imageHelper';
import { ImgContext } from "./Context";
// import { GEMINI_API_KEY } from '../core/config';

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyA8xpePRCL_zqFgdYZH7BisU79NL5g0JgE");

    const [image, setImage] = useState('');
    const { imgSrc } = useContext(ImgContext);
    const [imageInineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("imageInineData is changing", imageInineData);
        if (imageInineData) {
            aiImageRun();
        }
      }, [imageInineData]);
      
      useEffect (() => {
        console.log("imgSrc is changing", imgSrc)
        if(imgSrc){
            let tempImageObject = {
                inlineData: {
                data: imgSrc.substring(imgSrc.indexOf(",")+1),
                mimeType: imgSrc.substring(imgSrc.indexOf(":")+1, imgSrc.indexOf(";"))
                 }
            }
            console.log("tempImageObject", tempImageObject);
            setImageInlineData(tempImageObject);
        }
        
    }, [imgSrc]);
    /**
     * Generative AI Call to fetch image insights
     */
    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
            "What's in this photo?", imageInineData
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

        // getting base64 from file to render in DOM
        getBase64(file)
            .then((result) => {
                setImage(result);
            })
            .catch(e => console.log(e))

        // generating content model for Gemini Google AI
        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        })
    }

    // Converts a File object to a GoogleGenerativeAI.Part object.

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
            <div>
                <div style={{ display: 'flex' }}>
                    {/* <input type='file' onChange={(e) => handleImageChange(e)} />               */}
                      </div>
                <img src={image} style={{ width: '30%', marginTop: 30 }} />
            </div>

            {
                loading == true && (aiResponse == '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                    </div>
            }
        </div>
    );
};

export default AiwithImage;