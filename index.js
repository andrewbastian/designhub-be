require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// ******************* MIDDLEWARE **************************

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(cors());
server.use(helmet());

// ************************ PORT SET UP *************************

const PORT = process.env.PORT || 6969;

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});