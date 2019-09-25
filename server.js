const bb = require('bot-brother');

// import db and bot from init file
const { db, bot } = require('./init');

//import commands from botActions
const {
  botStart,
  botStop,
  botHelp,
} = require('./botActions');

botStart(bot, db);
botStop(bot, db);
botHelp(bot, db);
