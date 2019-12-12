const db = require("firebase-admin").firestore();
const dateUtil = require("./utils/dateUtil");
const poolCollectionRef = db.collection("matchPool");

// Remove user from pool if they have been in pool for this many seconds
const TIME_TO_REMOVE_SECONDS = 20; /* 30 * 60 */ // 30 minutes

let cleanMatchPool = async () => {
  let poolMembers = await poolCollectionRef.get();

  console.debug("Starting cleanup");

  if (poolMembers.empty) return false;

  let batch = db.batch();

  console.debug("Cleanup started");
  poolMembers.docs.map(memberSnapshot => {
    let member = memberSnapshot.data();
    let timeElapsedSeconds = dateUtil.dateDiffSeconds(member.dateJoined);
    if (timeElapsedSeconds >= TIME_TO_REMOVE_SECONDS) {
      let currPoolRef = poolCollectionRef.doc(memberSnapshot.id);
      batch.delete(currPoolRef);
    }

    return member;
  });
  return batch.commit();
};

module.exports = cleanMatchPool;
