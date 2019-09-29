const fbFunc = require('../firebaseFunctions');

messageToSend = (message) =>
  `*Message from Jeevani*\n-------------------\n${message}`

module.exports = (bot, db, username, message) => {
  fbFunc
    .checkIfusernameExists(db,username)
    .then((data) => {
      const {chatID} = data;
      console.log('chatID:',chatID);
      if (typeof chatID === 'number') {
        bot.telegram.sendMessage(chatID, messageToSend(message), {parse_mode: 'Markdown'})
        console.log(username, " received: ", message);
      } else {
        console.log(`${username} exists, but there is no chatID`);
      }
    })
    .catch(error => {
      console.log(error);
      console.log(`username does not exist, failed to send message to ${username}`);
    })
}
