const fbFunc = require('../firebaseFunctions');

module.exports = (bot, db) => {
  ///start command
  bot.command('start').invoke(function(ctx) {
    // Setting data, data is used in text message templates.
    ctx.data.user = ctx.meta.user;
    let username = ctx.meta.user.username;
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID, name } = data;
        console.log(data);
        if (chatID.length === 0) {
          //add chatID into database
          fbFunc
            .addIdToDatabase(db, username, ctx.meta.user.id)
            .then(res => {
              ctx.sendMessage(
                `Hello ${name}, your information has been registered.`
              );
            });
        }
      })
      .catch(error => {
        console.log(error);
        ctx.sendMessage('Error occurred.');
      });

    // Invoke callback must return promise.
    return ctx.sendMessage('Hello I am Jeevani');
  });
};
