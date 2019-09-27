const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, CITIZEN_HELP_MESSAGE } = require('./constants');

module.exports = (bot, db) => {
  bot.command('help', ctx => {
    let username = ctx.from.username;
    console.log("botHelp called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID, name } = data;
        console.log(data);
        if (typeof chatID === 'number') {
          return ctx.reply(citizenHelpMessage, {parse_mode: 'Markdown'});
        } else {
          return ctx.reply(notStartedError(username));
        }
      })
      .catch(error => {
        console.log(error);
        ctx.reply(ERROR_MESSAGE);
      });
  });
};

const citizenHelpMessage = CITIZEN_HELP_MESSAGE;
