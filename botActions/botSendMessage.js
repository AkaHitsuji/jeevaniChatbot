const fbFunc = require('../firebaseFunctions');
const {ERROR_MESSAGE} = require('./constants');

message = "this is a test message"
// check for username to get chatid, need doctor name to input in message
module.exports = (bot, db, username) => {
  fbFunc
    .checkIfusernameExists(db,username)
    .then((data) => {
      const {chatID} = data;
      if (typeof chatID === 'number') {
        bot.telegram.sendMessage(chatID, message)
      } else {
        console.log(`${username} exists, but there is no chatID`);
      }
    })
    .catch(error => {
      console.log(error);
      console.log(`username does not exist, failed to send message to ${username}`);
    })

}
