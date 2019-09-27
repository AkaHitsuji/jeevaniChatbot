// import db and bot from init file
const { db, bot } = require('./init');

//import commands from botActions
const {
  botStart,
  botStop,
  botHelp,
  botMedicalRecords,
  botLastVisit,
  botSendMessage,
} = require('./botActions');

botStart(bot, db);
botStop(bot, db);
botHelp(bot, db);
botMedicalRecords(bot, db);
botLastVisit(bot, db);

bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

bot.startPolling();

// to prevent heroku web process failed to bind to port error
const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
  // Set a response type of plain text for the response
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send back a response and end the connection
  res.end('Hello World!\n');
});

// Start the server on port 3000
app.listen(process.env.PORT || 5000, '0.0.0.0');
