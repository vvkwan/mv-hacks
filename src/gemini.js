// require('dotenv').config()
// import { Buffer } from 'buffer';
// window.Buffer = Buffer;


const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyA8xpePRCL_zqFgdYZH7BisU79NL5g0JgE");

// Access your API key as an environment variable (see "Set up your API key" above)
// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }

// function fileToGenerativePart(path, mimeType) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(new File([path], path, { type: mimeType }));
//       reader.onload = (event) => resolve({
//         inlineData: {
//           data: event.target.result.split(',')[1], // Extract base64 data after comma
//           mimeType,
//         },
//       });
//       reader.onerror = (error) => reject(error);
//     });
//   }

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "tell me whats in this picture";
  const imageParts = [
              fileToGenerativePart("public/logo192.png", "image/png"),
            ];
      

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();