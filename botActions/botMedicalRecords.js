const axios = require("axios");

const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE, MEDICAL_RECORD_MESSAGE } = require('./constants');

module.exports = (bot, db) => {
  bot.command('medical', ctx => {
    let username = ctx.from.username;
    console.log("botMedicalRecords called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const {chatID} = data;
        console.log(chatID);
        if (typeof chatID === 'number') {
          const medical_url = "https://jeevani-backend.herokuapp.com/chatbot/"+username+"/medical"
          getResponse(medical_url)
            .then((data) => {
              const name = data.user_data.name
              const a_ID = data.a_id
              const dob = data.user_data.dob
              const gender = data.user_data.gender
              const height = data.user_data.height
              const weight = data.user_data.weight
              const bloodtype = data.user_data.bloodtype

              return ctx.reply(medicalRecordMessage(name, a_ID, dob, gender, height, weight, bloodtype), {parse_mode: 'Markdown'});
              console.log(username,' has accessed medical records');
            })
            .catch(error => {
              console.log(error);
              ctx.reply(FAILED_GET_REQ)
            })
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

const getResponse = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const medicalRecordMessage = MEDICAL_RECORD_MESSAGE;
