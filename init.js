const firebase = require('firebase-admin');
const Telegraf = require('telegraf');

const config = require('./config/config.json');
const serviceAccount = require('./config/serviceAccountKey.json');

const { apiKey, databaseURL } = config;
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseAuthVariableOverride: { uid: 'admin' },
  databaseURL
});

module.exports.db = firebase.firestore();
//
// module.exports.bot = bb({
//   key: apikey,
//   sessionManager: bb.sessionManager.memory(),
//   polling: { interval: 0, timeout: 1 }
// });
module.exports.bot = new Telegraf(apiKey);
