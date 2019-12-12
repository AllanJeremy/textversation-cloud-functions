const db = require("firebase-admin").firestore();
const dateUtil = require("./utils/dateUtil");
const chatThreadCollectionRef = db.collection("chatThreads");

// Time after which we should remove the chat in minutes
const TIME_TO_REMOVE_MINUTES = 1; /* 24 * 60 */ // One day

let removeExpiredChats = async () => {
  // Only select active chat threads to save on reads ~ no need to read deactivated chats
  let chatThreads = chatThreadCollectionRef.where("isActive", "==", true).get();
  console.debug("removing expired chats");
  if (chatThreads.empty) return false;
  console.info(chatThreads);

  let batch = db.batch();

  console.debug("started removing");
  // Chats exist
  chatThreads.docs.map(chatSnapshot => {
    let chat = chatSnapshot.data();
    let timeElapsedMinutes = dateUtil.dateDiffMinutes(chat.dateStarted);

    if (timeElapsedMinutes >= TIME_TO_REMOVE_MINUTES) {
      let currChatThreadRef = chatThreadCollectionRef.doc(chatSnapshot.id);

      batch.update(currChatThreadRef, { isActive: false });
    }

    return chat;
  });

  return batch.commit();
};

module.exports = removeExpiredChats;
