const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const transactionService = require('../service/transactionService');

router.post('/signup', async function (req, res) {
    var user =  createUserFromRequest(req);
    var isNewUserCreated =  await userService.createNewUser(user);
    if(isNewUserCreated) {
        var refererUser = await userService.getUserByReferalId(user.refBy);
        if(refererUser != null) {
            console.log("Referrer User id: " + refererUser.userId); 
            transactionService.addBonusForReferrer(refererUser);
            transactionService.addBonusForNewUser(user.mob_num);
            return res.send("New User Created for mob_num : " + user.mob_num);
        } else {
            const message = "Invalid Refferal Code";
            return res.send(message);
        }
    }
    
});

function createUserFromRequest(req) {
    return  {
        userName : req.body.user_name,
        email : req.body.email,
        refBy : req.body.refBy,
        auto_password : req.body.auto_password,
        mob_num : req.body.mob_num
    };
}

module.exports = router;