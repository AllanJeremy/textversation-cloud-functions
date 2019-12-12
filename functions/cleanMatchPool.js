const db = require("firebase-admin").firestore();
const dateUtil = require("./utils/dateUtil");
const poolCollectionRef = db.collection("matchPool");

// Remove user from pool if they have been in pool for this many minutes
const TIME_TO_REMOVE_MINUTES = 30;

let cleanMatchPool = async () => {
  let poolMembers = await poolCollectionRef.get();

  if (!poolMembers.size) return false;

  let batch = db.batch();

  poolMembers.docs.map(memberSnapshot => {
    let member = memberSnapshot.data();
    let timeElapsedMinutes = dateUtil.dateDiffMinutes(member.dateJoined);
    if (timeElapsedMinutes >= TIME_TO_REMOVE_MINUTES) {
      let currPoolRef = poolCollectionRef.doc(memberSnapshot.id);
      batch.delete(currPoolRef);
    }

    return member;
  });
  batch.commit();
  return true;
};

module.exports = cleanMatchPool;
