const axios = require("axios");
const db = require("firebase-admin").firestore();

const userCollectionRef = db.collection("users");
const API_URL = "https://textversation-api.appspot.com";

const { CLOUD_FUNCTIONS_USER_SECRET } = require("./config/secrets");

//! Possibly inefficient to update user nicknames when we have more than 10000 users
let updateUserNicknames = async () => {
  let url = `${API_URL}/user/${CLOUD_FUNCTIONS_USER_SECRET}/update-nicknames`;

  //? Getting users in cloud functions because our backend MUST not do any direct db reads at the moment ~ simply a design choice
  let users = await userCollectionRef.get();

  // No users found ~ no need to proceed and make any API requests
  if (!users.size) return false;

  //* Users found ~ proceed to update nicknames
  let requestData = {};

  requestData.data = users.docs.map(doc => {
    let data = doc.data();
    return {
      id: doc.id,
      gender: data.gender
    };
  }); // An array of ids

  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData)
      .then(response => {
        console.log(response.data);
        return resolve(response.data); //? Wtf?? ~ returning to suppress linting
      })
      .catch(err => {
        console.error("Error while updating nicknames");
        console.error(err.message);
        reject(err);
      });
  });
};

module.exports = updateUserNicknames;
