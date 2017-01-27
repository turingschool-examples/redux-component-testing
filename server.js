// =================================================================
// require all necessary packages & our .env config file ===========
// =================================================================

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');




// =================================================================
// app setup & configuration =======================================
// =================================================================

// Super wrong way to do this but I am lazy do not copy
app.locals.credentials = {
  name: 'Bob Loblaw',
  email: 'foo@bar.com',
  password: 'baz'
}

// Use body parser so we can get info from POST/URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// =================================================================
// API endpoints ===================================================
// =================================================================

// Authentication/Login Endpoint
app.post('/authenticate', (request, response) => {
  const user = request.body;
  const creds = app.locals.credentials;

  // If the user enters credentials that don't match our hard-coded
  // credentials in our .env configuration file, send a JSON error
  if (user.email !== creds.email || user.password !== creds.password) {
    response.status(403).send({ success: false, message: 'Invalid Credentials' });
  }

  // If the credentials are accurate, send back credentials
  // Don't copy this is also wrong and bad
  else {
    response.json(app.locals.credentials);
  }
});




// =================================================================
// start the server ================================================
// =================================================================

app.listen(3001);
console.log('Listening on http://localhost:3001');
