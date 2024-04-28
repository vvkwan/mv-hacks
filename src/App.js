import logo from './logo.svg';
import './App.css';
import WebcamCapture from './components/webcam';
import Home from './components/homepage';

// export const routes = [{path: '/', name: 'Home', component: <Home />}];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebcamCapture />
        <Home />
      </header>
    </div>
  );
}

export default App;
