require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { createTunnel } = require('./helpers/tunnel');

const { PORT: port } = process.env;
console.log(port);
const app = express();

app.use(bodyParser.json());
app.use(routes);
app.listen(port);

module.exports = app;
