import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import ReactMarkdown from "react-markdown";

function Chatbot() {

  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([{role: 'Bot', text: "Hi"}]);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: 'User', text: prompt};
    setHistory( (prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const res = await axios.post("http://localhost:8000/user/chatbot", {prompt}, {withCredentials: true});
      console.log(res);
      const botMessage = { role: 'Bot', text: res.data};
      setHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      setHistory((prev) => [...prev, "Something went wrong while generating response"]);
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col justify-center items-center p-4 space-y-5 bg-amber-300 overflow-x-hidden'>

      <h1 className='font-extrabold'>ChatBot</h1>

      <div className='flex flex-col overflow-y-scroll h-[500px] space-y-4 border-2 border-white p-4 w-[70%] rounded-md'>
        <>
        {
           history.map((message, index) => (
            <div key={index} className='border-2 p-2 border-white w-auto rounded-md'>
              <ReactMarkdown>{`${message.role} :: ${message.text}`}</ReactMarkdown>
            </div>
           ))
        }
        </>
      </div>

      <div className='flex space-x-3'>
        <input type="text" onChange= {handleChange} placeholder='Enter prompt' value={prompt} className='border-2 border-white p-2 rounded-lg'/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Chatbot
