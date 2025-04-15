import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState(null);

  axios.defaults.baseURL=process.env.REACT_APP_BACKEND_URL;

  const handleInput = (e) => {
    setUsername(e.target.value)
  }

  const handleSend = () => {
    axios.post("/c/0d19-26d9-49f0-ba73", {
      name: username
    }).then((response)=>{
      setMessage(response.data.message);
    }).catch((error)=>{
      setMessage("Sorry! Please Try Again")
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Enter Your Name</p>
        <input type="text" onChange={(e)=>{handleInput(e)}}/>
        <br />
        <button onClick={handleSend}>Send to Backend</button>
        <h1>{message&&message}</h1>
      </header>
    </div>
  );
}

export default App;
