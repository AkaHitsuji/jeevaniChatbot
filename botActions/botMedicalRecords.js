const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, MEDICAL_RECORD_MESSAGE } = require('./constants');

// hardcoded medical data for now
const medicalData = {
  "name": "Ang Yang",
  "dateOfBirth": "03/02/1994",
  "height": 181,
  "weight": 80,
  "bloodType": "O",
}

module.exports = (bot, db) => {
  bot.command('medical', ctx => {
    let username = ctx.from.username;
    console.log("botMedicalRecords called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const {chatID} = data;
        const {name,dateOfBirth,height,weight,bloodType} = medicalData
        console.log(chatID);
        console.log(typeof(chatID));
        if (typeof chatID === 'number') {
          return ctx.reply(medicalRecordMessage(username, dateOfBirth, height, weight, bloodType), {parse_mode: 'Markdown'});
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

const medicalRecordMessage = MEDICAL_RECORD_MESSAGE;
