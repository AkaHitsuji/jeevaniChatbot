// import db and bot from init file
const { db, bot } = require('./init');
const { greetings, vulgarities} = require('./sentenceConstants')

//import commands from botActions
const {
  botStart,
  botStop,
  botHelp,
  botMedicalRecords,
  botLastVisit,
  botAskPermission,
  botNoCommand,
  botYesCommand,
  botSendMessage,
  botLabReport
} = require('./botActions');

botStart(bot, db);
botStop(bot, db);
botHelp(bot, db);
botMedicalRecords(bot, db);
botLastVisit(bot, db);
botLabReport(bot, db);
botNoCommand(bot, db);
botYesCommand(bot, db);

bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears(greetings, ctx => {
  ctx.reply('Hello there!')
  ctx.reply('😁')
});
bot.hears(vulgarities, ctx => ctx.reply('Please do not use vulgarities. Jeevani is family friendly :)'));

bot.startPolling();

// setup server
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())

// Start the server on port 3000
app.listen(process.env.PORT || 5000, '0.0.0.0');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

// POST method to send message
app.post('/send', function (req, res) {
  if (req.body.username) {
    let username = req.body.username
    let doctor = req.body.doctor
    let time = req.body.time
    botAskPermission(bot,db,username,doctor,time)
    res.send('approval message sent to ',req.body.username)
  } else {
    res.send('username does not exist in post request')
  }
})

// POST method to allow backend to push message
app.post('/notify', function (req, res) {
  if (req.body.username) {
    let username = req.body.username
    let message = req.body.message
    // bot send message
    botSendMessage(bot, db, username, message)
    res.send('message has been sent to ',req.body.username)
  } else {
    res.send('username does not exist in post request')
  }
})
