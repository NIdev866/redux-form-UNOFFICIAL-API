// ----------------------------------------------
// Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');
const db = require('./db');

// ----------------------------------------------
// App Setup
const app = express();

// morgan middleware for logging messages for debugging
app.use(morgan('combined'));

// allow CORS, optionally specify domains 'cors(HERE)'
app.use(cors());

// body parser middleware for parsing any incoming 
// requests to JSON
app.use(bodyParser.json({ type: '*/*' }));

// handle routes
router(app);



// ----------------------------------------------
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
