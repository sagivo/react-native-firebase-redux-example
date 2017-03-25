import firebase from 'firebase';

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BACKET,
  FIREBASE_MESSAGING_SENDER_ID } from '../config';


var config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BACKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export default firebase;
