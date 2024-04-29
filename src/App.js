import './App.css';
import WebcamCapture from './webcam';
import Gemini from './geminiComp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <WebcamCapture />
      {/* <Gemini /> */}
      </header>
    </div>
  );
}

export default App;
