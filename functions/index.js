const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const removeExpiredChats = require("./removeExpiredChats");
const cleanMatchPool = require("./cleanMatchPool");
const updateUserNicknames = require("./updateUserNicknames");

const DEFAULT_TIME_ZONE = "Africa/Nairobi";

//* SCHEDULED FUNCTIONS

// Every 5 minutes | Clean match pool (remove people that have been in match pool for a while)
exports.fiveMinuteSchedule = functions.pubsub
  .schedule("every 5 minutes")
  .timeZone(DEFAULT_TIME_ZONE)
  .onRun(context => {
    cleanMatchPool();
  });

// Every 60 minutes - 1 hour | Remove expired chats
exports.hourlySchedule = functions.pubsub
  .schedule("every 60 minutes")
  .timeZone(DEFAULT_TIME_ZONE)
  .onRun(context => {
    removeExpiredChats();
  });

// Daily | Update user nicknames
exports.dailySchedule = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone(DEFAULT_TIME_ZONE)
  .onRun(context => {
    updateUserNicknames();
  });
