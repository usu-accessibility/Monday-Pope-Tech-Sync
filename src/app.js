const path = require('path'); 
require('dotenv').config({ path: path.join('/home/ec2-user/Monday-Pope-Tech', '.env') });

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
