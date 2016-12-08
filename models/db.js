import firebase from 'firebase';
var config = {
  apiKey: "xxx",
  authDomain: "xxx",
  databaseURL: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx1"
};
firebase.initializeApp(config);
export default firebase.database();
