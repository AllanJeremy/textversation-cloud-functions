/** Get the time elapsed in seconds from a firebase timestamp
 * @param {FirebaseTimestamp} firebaseTimestamp A firebase timestamp
 * @return {number} Time elapsed since the provided timestamp in seconds
 */
function getTimeElapsedTimestampInSeconds(firebaseTimestamp) {
  let timestampInSeconds = firebaseTimestamp.seconds;
  let dateNowInSeconds = Date.now() / 1000;

  let timeElapsed = dateNowInSeconds - timestampInSeconds;

  return timeElapsed;
}

/** Get the date difference in minutes based on the provided firebase timestamp
 * @param {FirebaseTimestamp} firebaseTimestamp A firebase timestamp
 * @return {number} Time elapsed since the provided timestamp in minutes
 */
module.exports.dateDiffMinutes = firebaseTimestamp => {
  let timeElapsedSeconds = getTimeElapsedTimestampInSeconds(firebaseTimestamp);
  return Math.floor(timeElapsedSeconds / 60);
};

/** Get the date difference in minutes based on the provided firebase timestamp
 * @param {FirebaseTimestamp} firebaseTimestamp A firebase timestamp
 * @return {number} Time elapsed since the provided timestamp in seconds
 */
module.exports.dateDiffSeconds = firebaseTimestamp => {
  let timeElapsedSeconds = getTimeElapsedTimestampInSeconds(firebaseTimestamp);
  return Math.floor(timeElapsedSeconds);
};
