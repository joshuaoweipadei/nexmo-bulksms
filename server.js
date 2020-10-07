const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

// Define
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

app.use(express.json({ extended: false }));
app.use(cors());

// Define bulksms route
app.use('/api', require('./routes/bulksms'));

if(process.env.NODE_ENV === 'production'){
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// start server
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});