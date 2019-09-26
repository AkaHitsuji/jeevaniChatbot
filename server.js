// import db and bot from init file
const { db, bot } = require('./init');

//import commands from botActions
const {
  botStart,
  botStop,
  botHelp,
  botMedicalRecords,
  botLastVisit,
} = require('./botActions');

botStart(bot, db);
botStop(bot, db);
botHelp(bot, db);
botMedicalRecords(bot, db);
botLastVisit(bot, db);

bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

bot.startPolling();
