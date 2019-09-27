const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE } = require('./constants');

module.exports.botYesCommand = (bot, db) => {
  bot.command('YES', ctx => {
    let username = ctx.from.username;
    console.log("yes confirmation called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID } = data;
        if (typeof chatID === 'number') {
          console.log('send yes to weijian');
        }
      })
      .catch(error => {
        console.log(error);
        ctx.reply(ERROR_MESSAGE);
      });
  });
};

module.exports.botNoCommand = (bot, db) => {
  bot.command('NO', ctx => {
    let username = ctx.from.username;
    console.log("no confirmation called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID } = data;
        if (typeof chatID === 'number') {
          console.log('send no to weijian');
        }
      })
      .catch(error => {
        console.log(error);
        ctx.reply(ERROR_MESSAGE);
      });
  });
};
