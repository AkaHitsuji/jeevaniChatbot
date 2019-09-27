const firebase = require('firebase-admin');
const Telegraf = require('telegraf');

const config = require('./config/config.json');
const serviceAccount = require('./config/serviceAccountKey.json');

// comment out when pushing to heroku
// const { apiKey, databaseURL } = config;
// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseAuthVariableOverride: { uid: 'admin' },
//   databaseURL
// });

// comment out when running locally
const apiKey = process.env.apiKey;
const databaseURL = process.env.databaseURL;
const serviceAccount = JSON.parse(process.env.serviceAccount);
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseAuthVariableOverride: { uid: 'admin' },
  databaseURL
});

module.exports.db = firebase.firestore();
module.exports.bot = new Telegraf(apiKey);
