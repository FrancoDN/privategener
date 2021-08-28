const express = require('express');
const app = express()

app.use(require('./donor'));
app.use(require('./plant'));
app.use(require('./land'));


module.exports = app