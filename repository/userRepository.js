const db = require('../dbCon');

async function addNewUser(user){
  let query = "INSERT INTO user_login (user_name, email, mob_num, auto_password, referral_code) VALUES(?, ?, ?, ?, ?)"
  let params = [user.userName, user.email, user.mob_num, user.auto_password, user.referralCode];
  const promise = new Promise((resolve, reject) => {
      db.fantasyAuthConnect.query(query,params, (err, conn) => {
          if (err) {
              resolve(false)
          }else{
              if(conn && conn.affectedRows==1) {
                resolve(true);
              } else {
                resolve(false);
              }
          }
      });
  });

  return promise;
}

async function getUserByReferalId(referalId){
  let query = "Select * FROM user_login WHERE referral_code = ?"
  let params = [referalId];
  return new Promise((resolve, reject) => {
      db.fantasyAuthConnect.query(query,params, (err, conn) => {
          if (err) {
              reject(null)
          }else{
              if(conn != undefined && conn.length==0) {
                  resolve(null);
              } else {
                var user = parseUserObject(conn[0]);
                resolve(user);
              }
          }
      })
  });
}

async function getUserByMobileNumber(mobileNumber){
  let query = "Select * FROM user_login WHERE mob_num = ?"
  let params = [mobileNumber];
  return new Promise((resolve, reject) => {
      db.fantasyAuthConnect.query(query,params, (err, conn) => {
          if (err) {
              reject(null)
          }else{
              if(conn != undefined && conn.length==0) {
                  resolve(null);
              } else {
                var user = parseUserObject(conn[0]);
                resolve(user);
              }
          }
      })
  });
}

function parseUserObject(response) {
  var user = {};
  user.userId = response.id;
  user.mob_num = response.mob_num;
  user.signUpTime = response.signup_time;
  user.referrerCode = response.referrer_code;
  user.referralCode = response.referral_code;
  return user;
}

module.exports = {addNewUser, getUserByReferalId, getUserByMobileNumber};
