const { ComChangeUserPacket } = require('mysql/lib/protocol/packets');
const db = require('../dbCon');

async function createTransaction(transactionOrder){
  let query = "INSERT INTO user_transaction (orderId, bonus_amount, user_id, transaction_type, date_of_payment) VALUES(?, ?, ?, ?, ?)"
  let params = [
    transactionOrder.orderId,
    transactionOrder.bonusAmount,
    transactionOrder.userId,
    7,
    transactionOrder.dateOfPayment
  ];
  const promise = new Promise((resolve, reject) => {
      db.fantasyAuthConnect.query(query,params, (err, conn) => {
          if (err) {
            console.log("Transaction creation failed with orderId: " + transactionOrder.orderId);
            resolve(false);
          }else{
              if(conn && conn.affectedRows==1) {
                if(conn.affectedRows==1) {
                  console.log("Transaction created with orderId: " + transactionOrder.orderId);
                  resolve(true);
                } else if(conn.affectedRows==0) {
                  console.log("Transaction already exist with orderId: " + transactionOrder.orderId);
                  resolve(false);
                } else if(conn.affectedRows>1) {
                  console.log("Critical : Multiple Transaction created with orderId: " + transactionOrder.orderId);
                  resolve(false);
                }
              } 
          }
      })
  });
  return promise;
}

async function updateWalletWithBonus(transactionOrder){
  const walletUpdateQuery = "UPDATE user_balance SET bonus = bonus + ?, balance = balance + ? WHERE uuid = ?";
  const transactionUpdateQuery = "UPDATE user_transactions SET wallet_updated = '1' WHERE orderId = ?";
  const walletUpdateQueryParams = [transactionOrder.bonusAmount, transactionOrder.bonusAmount, transactionOrder.userId];
  const transactionUpdateQueryParams = [transactionOrder.orderId];
  db.fantasyAuthConnect.getConnection(async (err, connection) => {
      if(err) {
        connection.release();
      } else if(connection) {
        connection.beginTransaction((err, conn) => {
          if(err) {
            reject("Failed starting transaction");
          } else if(conn) {
            console.log("Started transaction");
            connection.query(walletUpdateQuery, walletUpdateQueryParams, (err, conn) => {
              if(err) {
                reject("Failed adding money to the user wallet " + transactionOrder.userId);
              } else if(conn) {
                connection.query(transactionUpdateQuery, transactionUpdateQueryParams, (err, conn) => {
                  if(err) {
                    console.log("Rollbacking the changes since transaction update failed");
                    connection.rollback();
                    connection.release();
                  } else if(conn) {
                    connection.commit();
                    console.log("Successfully completed the transaction");
                  }
                });
              }
            });
          }
        });
      }
  });
  
}

async function createWallet(user){
  let query = "INSERT into user_balance (uuid) VALUES(?)"
  let params = [user.userId];
  return new Promise((resolve, reject) => {
      db.fantasyAuthConnect.query(query,params, (err, conn) => {
          if (err) {
              reject(null)
          }else{
              if(conn != undefined && conn.affectedRows==1) {
                  resolve(true);
              } else {
                  resolve(false);
              }
          }
      })
  });
}

module.exports = {createTransaction, createWallet, updateWalletWithBonus};