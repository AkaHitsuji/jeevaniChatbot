const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, LAST_VISIT_MESSAGE } = require('./constants');

// hardcoded last visit data for now
const lastVisitData = {
  "clinic": "Jeevani GP",
  "dateOfVisit": "29/09/2019",
  "medicinePrescribed": "Panadol, Ibuprofen",
  "additionalNotes": "2 pills 3 times a day after meal",
}

module.exports = (bot, db) => {
  bot.command('lastvisit', ctx => {
    let username = ctx.from.username;
    console.log("botLastVisit called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const {chatID} = data;
        const {clinic, dateOfVisit, medicinePrescribed, additionalNotes} = lastVisitData
        console.log(chatID);
        console.log(typeof(chatID));
        if (typeof chatID === 'number') {
          return ctx.reply(lastVisitMessage(clinic, dateOfVisit, medicinePrescribed, additionalNotes), {parse_mode: 'Markdown'});
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

const lastVisitMessage = LAST_VISIT_MESSAGE;
