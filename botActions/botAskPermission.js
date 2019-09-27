const fbFunc = require('../firebaseFunctions');
const {ERROR_MESSAGE} = require('./constants');

const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

message = (username, doctor, time) =>
  `*Notification from Jeevani*\n-------------------\nHi ${username}, Dr. ${doctor} has requested to access your medical records at ${time}, do you grant him/her permission to do so?\nPlease tap on one of the following responses:\n\/YES\n\/NO`

module.exports = (bot, db, username, doctor, time) => {
  console.log("message to request for permission sent to ",username);
  fbFunc
    .checkIfusernameExists(db,username)
    .then((data) => {
      const {chatID} = data;
      console.log('chatID:',chatID);
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
