import React, { useState, useContext, Fragment } from 'react'
import AlertContext from '../components/context-alert/alertContext';

function InputTags({ setSelectedTags }){
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext
  const [tags, setTags] = useState([]);

  const numberRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  
  const handleAddTags = (event) => {
    if(event.key === "Enter"){
      if(event.target.value === ""){
        setAlert("Enter recieptient phone number", "warn")
      } else {
        if(numberRegex.test(event.target.value)){
          setTags([...tags, event.target.value]);
          setSelectedTags([...tags, event.target.value]);
          event.target.value = "";
        } else{
          setAlert("Invalid international phone number", "warn")
        }
      } 
    }
  }

  const handleRemoveTags = (index) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
  }

  return (
    <Fragment>
      <h3>Sending Bulk SMS</h3>
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, i) => (
            <li key={i} className="tag">
              <span className="tag-title">{tag}</span>
              <i className="fa fa-close" onClick={() => handleRemoveTags(i)} ></i>
            </li>
          ))}
        </ul>
        <input type="text" onKeyUp={(event) => handleAddTags(event)} placeholder="Press 'ENTER' to add another phone number" />
      </div>
      <small className="small-text">
        <span>Enter any international phone number</span>
        <span>Numbers: {tags.length}</span>
      </small>
    </Fragment>
    
  )
}

export default InputTags