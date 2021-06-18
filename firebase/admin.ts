const admin = require("firebase-admin");
const serviceAccount = require("./secrets.json");

export const verifyIdToken = (token: any) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credentials: admin.credential.cert(serviceAccount),
      databaseURL: "https://indoorv2-default-rtdb.firebaseio.com",
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error: any) => {
      console.log(error);
      throw error;
    });
};
