const fbFunc = require('../firebaseFunctions');
const {ERROR_MESSAGE} = require('./constants');


module.exports = (bot, db) => {
  ///start command
  bot.command('start', ctx => {
    // Setting data, data is used in text message templates.
    let username = ctx.from.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const {chatID} = data;
        console.log(data);
        if (chatID.length === 0) {
          //add chatID into database
          fbFunc
            .addIdToDatabase(db, username, ctx.from.id)
            .then(res => {
              ctx.reply(
                `Hello ${username}, your information has been registered.`
              );
            });
        }
      })
      .catch(error => {
        console.log(error);
        ctx.reply(ERROR_MESSAGE);
      });

    return ctx.reply('Hello I am Jeevani');
  });
};
