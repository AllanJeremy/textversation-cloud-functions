const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const removeExpiredChats = require("./removeExpiredChats");
const cleanMatchPool = require("./cleanMatchPool");
const updateUserNicknames = require("./updateUserNicknames");

const DEFAULT_TIME_ZONE = "Africa/Nairobi";

//* SCHEDULED FUNCTIONS

// Every 5 minutes
exports.fiveMinuteSchedule = functions.pubsub
  .schedule("every 5 minutes")
  .timeZone(DEFAULT_TIME_ZONE)
  .onRun(context => {
    console.debug("Wazzappenin");
    removeExpiredChats();
    cleanMatchPool();
  });

// Daily
exports.dailySchedule = functions.pubsub
  .schedule("every 1 mins")
  .timeZone(DEFAULT_TIME_ZONE)
  .onRun(context => {
    updateUserNicknames();
  });
