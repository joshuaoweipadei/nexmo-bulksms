import React, { useState, useContext } from 'react'
import AlertContext from './context-alert/alertContext';

import InputTags from './InputTags';

import config from '../config'

function SendBulkSms(){
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext
  const [selectedTags, setSelectedTags] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendSMS = () => {
    if(selectedTags.length === 0){
      setAlert("At least one receptient is required", "warn")
    } else if(message === ""){
      setAlert("Message is required", "warn")
    } else{
      fetch(`${config.apiUrl}/sendsms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, selectedTags })
      })
      .then((res) => res.json())
      .then((data) => {
          setAlert(data.message, data.type)
      })
    }
  }

  return (
    <div>
        <InputTags setSelectedTags={setSelectedTags} />
        <textarea onChange={(event) => setMessage(event.target.value)} className="textarea" rows="6" placeholder="Write something here. . ."></textarea>
        <div>
          <button className="btn-send" onClick={handleSendSMS}>Send Message</button>
        </div>
        <div style={{clear:"both"}}></div>
    </div>
  )
}

export default SendBulkSms;