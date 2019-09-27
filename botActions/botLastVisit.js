const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, LAST_VISIT_MESSAGE } = require('./constants');

// hardcoded last visit data for now
const lastVisitData = {
  "clinic": "Tata Consultants",
  "dateOfVisit": "12/09/2019",
  "medicinePrescribed": "Panadol, Morphine, Ice",
  "additionalNotes": "take medicine 16 times a day. make a visit in three weeks time",
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
