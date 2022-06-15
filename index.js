const express = require('express');
const signUpController = require('./controller/signupController');

const app = express()
const port = 3600

// for parsing the body in POST request
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", signUpController)

/*
app.post('/api/signup', async function (req, res) {
    var userName = req.body.user_name;
    var email = req.body.email;
    var refBy = req.body.refBy;
    var auto_password = req.body.auto_password;
    var mob_num = req.body.mob_num;
    var newUser =  await signUpService.createNewUser(userName, email, mob_num, auto_password);
    var refererUser = await userService.getUserByReferalId(refBy);
    if(refererUser != null) {
      console.log("Referrer User id: " + refererUser.id); 
      transactionService.addBonusForReferer(refererUser);
      transactionService.addBonusToNewUser(newUser);
      return res.send("New User Created username, email " + userName + " " + email + " " + newUser);
    } else {
      const message = "Invalid Refferal Code";
      return res.send(message);
    }
});
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
