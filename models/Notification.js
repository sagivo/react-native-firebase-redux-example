import db from '../models/db';
import { FIREBASE_PUSH_SERVER_KEY } from '../config';
const API_URL = "https://fcm.googleapis.com/fcm/send";

export default class Notification {
  constructor(args) {
  }

  static get type() {
    return {
      CALL_POST: 'CALL_POST',
      CALL_CANCEL: 'CALL_CANCEL',
      CALL_END: 'CALL_END',
    }
  }

  static sendPostCallReq(userId, callId, postText) {
    db.ref(`tokens/${userId}`).once('value', token => {
      const body = {
        to: token.val(),
        notification: {
          title: "Call about",
          sound: "default",
        },
        data: {
          type: this.type.CALL_POST,
          postText: postText,
          callId
        },
        priority: 'high',
        time_to_live: 60, // wait 60 seconds max
      }
      this.send(body);
    });
  }

  static sendCallCancel(userId, callId) {
    db.ref(`tokens/${userId}`).once('value', token => {
      const body = {
        to: token.val(),
        notification: {
          title: 'Call Ended',
        },
        data: {
          type: this.type.CALL_CANCEL,
          callId,
        },
        priority: 'high',
        time_to_live: 60, // wait 60 seconds max
      }
      this.send(body);
    });
  }

  static sendCallEnd(userId, callId) {
    db.ref(`tokens/${userId}`).once('value', token => {
      const body = {
        to: token.val(),
        notification: {
          title: 'Call Ended',
        },
        data: {
          type: this.type.CALL_END,
          callId,
        },
        priority: 'high',
        time_to_live: 60, // wait 60 seconds max
      }
      this.send(body);
    });
  }

  static send(bodyObj) {
    const body = JSON.stringify(bodyObj);

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: "key=" + FIREBASE_PUSH_SERVER_KEY,
    });

    fetch(API_URL, { method: "POST", headers, body })
    .then(response => console.log("response", response))
    .catch(error => console.log("Error sending " + type, error));
  }
}
