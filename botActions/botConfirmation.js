const axios = require("axios");

const fbFunc = require('../firebaseFunctions.js');
const { notStartedError, ERROR_MESSAGE } = require('./constants');

const FAILED_GET_REQ = "Your confirmation message failed to send, please check your internet connection."

module.exports.botYesCommand = (bot, db) => {
  bot.command('YES', ctx => {
    let username = ctx.from.username;
    console.log("yes confirmation called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID } = data;
        if (typeof chatID === 'number') {
          console.log('yes api call made');
          const yes_url = "https://jeevani-backend.herokuapp.com/chatbot/"+username+"/yes"
          getResponse(yes_url)
            .then((data) => {
              const {message} = data
              console.log(message);
              ctx.reply(message)
            })
            .catch(error => {
              console.log(error);
              ctx.reply(FAILED_GET_REQ)
            })
        }
      })
      .catch(error => {
        console.log(error);
        ctx.reply(ERROR_MESSAGE);
      });
  });
};

module.exports.botNoCommand = (bot, db) => {
  bot.command('NO', ctx => {
    let username = ctx.from.username;
    console.log("no confirmation called by ",username);
    fbFunc
      .checkIfusernameExists(db, username)
      .then((data) => {
        const { chatID } = data;
        if (typeof chatID === 'number') {
          console.log('no api call made');
          const no_url = "https://jeevani-backend.herokuapp.com/chatbot/"+username+"/no"
          getResponse(no_url)
            .then((data) => {
              const {message} = data
              console.log(message);
              ctx.reply(message)
            })
            .catch(error => {
              console.log(error);
              ctx.reply(FAILED_GET_REQ)
            })
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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
