import logo from './logo.svg';
import './App.css';
import WebcamCapture from './components/webcam';

// export const routes = [{path: '/', name: 'Home', component: <Home />}];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebcamCapture />
      </header>
    </div>
  );
}

export default App;
