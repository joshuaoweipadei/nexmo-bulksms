const express = require('express');
const router = express.Router();
const Nexmo = require('nexmo');

// routes
router.post('/sendsms', sendBulkSms);

module.exports = router;

function sendBulkSms(req, res){
  const { message, selectedTags } = req.body;

  const apiKey = '';
  const apiSecret = '';

  if(!apiKey || !apiSecret){
    return res.status(400).json({ type: "error", message: "Error: missing nexmo apiKey and apiSecret" });
  }

  const nexmo = new Nexmo({
      apiKey,
      apiSecret,
  });

  // Loop through each number and send sms message to them
  for (let i = 0; i < selectedTags.length; i++) {
    let numbers = selectedTags[i];

    nexmo.message.sendSms("from", numbers, message, (error, response) => {
      if(error){
        console.error(error)
        return res.status(400).json({ type: "error", message: "Error sending the message" });  
      }
      if(response){
        console.log(response)
        return res.status(200).json({ type: "success", message: "Message sent successful" });
      }
    });
  }
}