const fbFunc = require('../firebaseFunctions');

module.exports = (bot, db) => {
  bot.command('stop', ctx => {
    let username = ctx.from.username;
    console.log("botStop called by ",username);
    fbFunc
      .removeChatID(db, username)
      .then(_ => {
        return ctx.reply(
          'You have been unregistered from the bot. Press /start to register again'
        );
      })
      .catch(error => console.log(error));
  });
};
