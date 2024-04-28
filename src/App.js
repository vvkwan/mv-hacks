import './App.css';
import WebcamCapture from './components/webcam';
import Home from './components/homepage';
import {ImgContext} from "./Context.js";
import React, { useState } from "react";

// export const routes = [{path: '/', name: 'Home', component: <Home />}];

export default function App() {
  const [imgSrc, setImgSrc] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
    <ImgContext.Provider value= {{ imgSrc, setImgSrc }}>
       <WebcamCapture />
       <Home/>
    </ImgContext.Provider>
    </header>
    </div>
  );
}