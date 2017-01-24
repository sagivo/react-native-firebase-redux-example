import { PUSH_SERVER_KEY } from '../config';
const API_URL = "https://fcm.googleapis.com/fcm/send";

export default class Notification {
  constructor(args) {
    const body = {
      // to: 'dmZJYYpESRk:APA91bGGJJ0hLdvh2V7yetneew9rZ6CkqhJO3fpLMY82y5ZZWOwWlAteur7JaneXrl36WbB8S8cB5X--PCkfI2Fd-Vbey1p3mO6Wp1-qnIPJ2OCg3_qn7Q8aKQz33Y0X2Iwra3EAZgI_', // IOS SIMULATOR
      //to: 'eTqc6XVNQfs:APA91bHFbdBwVCQ89r0Hk_L09V-nufifioXCq729r13k8qTa7jH4V7PeeWkVkwKbsHFBv-0Vyd3m4b9b9FQsLBZ22V0JchbSlp6w62d9MAdzUF1AcPwYBwNFOYtljcB7SdpElsfXvRrf', // IOS DEVEICE
      to: 'egrF_uCjR_Y:APA91bGt-xzGT_I07a4me29bTdKrOEPwSeiP6U5prQRyaDRjHqxGXwb6WBz8CqO7jRnvnYrGPhC32ATmOREYMgb1MjZZvydcdNUgaKOJiYFCsfeRjlKVotsmN_wMBqzPfOSFvVoOq7f6', //android device
      notification: {
        title: "title for android",
        body: "This is a notification with only NOTIFICATION.",
        // sound: "default",
        "click_action": "fcm.ACTION.HELLO",
        baz: 'bur',
      },
      data: {
        foo: 'bar',
      },
      priority: 'high',
      // time_to_live: 3, // in seconds
    }

    // this.send(body);
  }

  send(bodyObj) {
    console.log('sending');
    const body = JSON.stringify(bodyObj);

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: "key=" + PUSH_SERVER_KEY,
    });

    fetch(API_URL, { method: "POST", headers, body })
    .then(response => console.log("response", response))
    .catch(error => console.log("Error sending " + type, error));
  }
}
