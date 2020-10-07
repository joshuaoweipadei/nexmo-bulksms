import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const SET_ALERT = 'SET_ALERT';
const REMOVE_ALERT = 'REMOVE_ALERT';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type, timeout = 4000) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { message, type, id }});

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  }

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;