//Joaquin Faundez et Adam Beliveau
//app5_s6gi fauj3006 bela1003

import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [activeDevice, setActiveDevice] = useState([]);

  useEffect(() => {
    activeDevices()
  }, []);

  const activeDevices = async () => {
    const response = await fetch('http://localhost:8080/');

    setActiveDevice(await response.json());
  }

  const changeLED = async () => {
    axios.get('http://localhost:3001/led').then(response => response.json());
  }

  return (
    <div className="App">
      <header className="App-header">
        employee covid tracker
        <button onClick={activeDevices}>Start seeing employees data</button>
        <div>Devices:</div>
        <div>{activeDevice.activeDevices}</div>
        <button id="ledToggle" type="button" onClick={changeLED}>Toggle led here</button>

      </header>
    </div>
  );
}

export default App;
