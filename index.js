const express = require('express');
const signUpController = require('./controller/signupController');

const app = express()
const port = 3600

// for parsing the body in POST request
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", signUpController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
