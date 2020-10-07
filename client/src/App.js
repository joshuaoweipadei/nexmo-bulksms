import React from 'react';
import AlertState from './components/context-alert/AlertState';

import Alert from './components/Alerts';
import SendBulkSms from './components/SendBulkSms';

import './App.css';

function App() {
  return (
    <AlertState>
      <div className="container">
        <SendBulkSms/>
        <Alert/>
      </div>
    </AlertState>
  );
}

export default App;
