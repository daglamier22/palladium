const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/palladium'));

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname + '/dist/palladium/index.html'));
});

app.listen(process.env.PORT || 8080);
