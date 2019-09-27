const fbFunc = require('../firebaseFunctions');
const {ERROR_MESSAGE} = require('./constants');

message = (username, doctor, time) =>
  `*Notification from Jeevani*\n-------------------\nHi ${username}, Doctor ${doctor} has accessed your medical records at ${time}`

// check for username to get chatid, need doctor name to input in message
module.exports = (bot, db, username, doctor, time) => {
  console.log("botSendMessage called by ",username);
  fbFunc
    .checkIfusernameExists(db,username)
    .then((data) => {
      const {chatID} = data;
      if (typeof chatID === 'number') {
        bot.telegram.sendMessage(chatID, message(username, doctor, time), {parse_mode: 'Markdown'})
      } else {
        console.log(`${username} exists, but there is no chatID`);
      }
    })
    .catch(error => {
      console.log(error);
      console.log(`username does not exist, failed to send message to ${username}`);
    })

}
