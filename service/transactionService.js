const db = require('../dbCon');
const transactionRepository  = require('../repository/transactionRepository');
const userRepository =  require('../repository/userRepository');


async function addBonusForNewUser(mobileNumber){
    const user = await userRepository.getUserByMobileNumber(mobileNumber);
    await transactionRepository.createWallet(user);
    const transactionOrder = createTransactionOrder(user.userId, user.referrerCode, user.signUpTime);
    addBonusToUser(transactionOrder);
}

async function addBonusForReferrer(user){;
    const transactionOrder = createTransactionOrder(user.userId, user.referralCode, user.signUpTime);
    addBonusToUser(transactionOrder);
}
  
async function addBonusToUser(transactionOrder){
    const isTransactionCreated = await transactionRepository.createTransaction(transactionOrder);
    if(isTransactionCreated) {
        await transactionRepository.updateWalletWithBonus(transactionOrder);
    }
    
}

function createTransactionOrder(userId, code, signUpTime) {
    const orderId = userId + code + signUpTime;
    const bonusAmount = 50;
    const transactionOrder =  {
        orderId : orderId,
        transactionType : 7,
        bonusAmount : 50,
        userId : userId,
        dateOfPayment : signUpTime
    }
    return transactionOrder;
}
  
module.exports = {addBonusForReferrer, addBonusForNewUser};