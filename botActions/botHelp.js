const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, CITIZEN_HELP_MESSAGE } = require('./constants');

module.exports = (bot, db) => {
  ///start command
  bot.command('help').invoke(ctx => {
    let username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID, name } = data;
        console.log(data);
        if (typeof chatID === 'number') {
          return ctx.sendMessage(citizenHelpMessage, {parse_mode: 'Markdown'});
        } else {
          return ctx.sendMessage(notStartedError(name));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage(ERROR_MESSAGE);
      });
  });
};

const citizenHelpMessage = CITIZEN_HELP_MESSAGE;
