const db = require('../dbCon');
const userRepository  = require('../repository/userRepository');
const md5 = require('md5');

async function createNewUser(newUser){
    newUser.referralCode = createReferralCodeToUser(newUser);
    return await userRepository.addNewUser(newUser);
}

async function getUserByReferalId(referrerId){
    return await userRepository.getUserByReferalId(referrerId);
}

function createReferralCodeToUser(newUser) {
    const referralCode = md5(newUser.mob_num);
    return referralCode;
}

module.exports = {createNewUser, getUserByReferalId};