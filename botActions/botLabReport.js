const axios = require("axios");

const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE } = require('./constants');



module.exports = (bot, db) => {
  bot.command('labreport', ctx => {
    let labReportMessage = `*Here are your latest Lab Report Test Results:*\n----------------------------\n\n`
    let username = ctx.from.username;
    console.log("botLabReport called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const {chatID} = data;
        console.log(chatID);
        if (typeof chatID === 'number') {
          const labreport_url = "https://jeevani-backend.herokuapp.com/chatbot/"+username+"/labreport"
          getResponse(labreport_url)
            .then((data) => {
              const {reports} = data
              const lastReport = reports[reports.length-1]
              for (key in lastReport.tests) {
                labReportMessage = labReportMessage + `${key}: *${lastReport.tests[key]}*\n`
                console.log(key, ": ", lastReport.tests[key]);
              }
              return ctx.reply(labReportMessage, {parse_mode: 'Markdown'});
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
