import db from './db';

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

const configIce = {iceServers: [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
]};

export default class WebRTC {
  constructor(events = {}) {
    this.events = events;
  }

  init(userId, otherUserId, cb) {
    this.userId = userId;
    this.otherUserId = otherUserId;

    this.getLocalMedia((localStream) => {
      // playLocalStream(localStream);

      this.pc = new RTCPeerConnection(configIce);
      this.pc.addStream(localStream);

      this.pc.onicecandidate = (event) => {
        if (event.candidate) db.ref(`webrtc/${this.userId}/ice`).push(JSON.stringify(event.candidate));
      }

      this.pc.onaddstream = (event) => {
        this.playRemoteStream(event.stream);
      }

      this.pc.oniceconnectionstatechange = () => {
        if(this.pc.iceConnectionState == 'disconnected') {
          console.log('Disconnected!');
          db.ref(`webrtc/${this.userId}`).remove();
          db.ref(`webrtc/${this.otherUserId}`).remove();
          if (this.events.onDisconnected) this.events.onDisconnected();
        }
      }

      //db rtc events
      db.ref(`webrtc/${this.otherUserId}/sdp`).on('child_added', (s) => {
        const signal = JSON.parse(s.val());
        this.pc.setRemoteDescription(new RTCSessionDescription(signal), () => {
          if(signal.type === 'offer') this.pc.createAnswer(this.gotDesc.bind(this), (e) => console.log(e));
        }, (err) => console.error(err));
      });

      db.ref(`webrtc/${this.otherUserId}/ice`).on('child_added', (s) => {
        this.pc.addIceCandidate(new RTCIceCandidate(JSON.parse(s.val())));
      });

      if (cb) cb();
    });
  }

  call(userId, otherUserId) {
    this.init(userId, otherUserId, () => this.pc.createOffer(this.gotDesc.bind(this), (e) => console.log(e)))
  }

  answer() {
    console.log('ansewr');
  }

  getLocalMedia(cb) {
    getUserMedia({ audio: true, video: false }, cb, (err) => console.error(err))
  }

  playRemoteStream(remoteStream) {
    console.log('play remoteStream!', remoteStream.toURL());
  }

  gotDesc(desc) {
    this.pc.setLocalDescription(desc, () => {
      db.ref(`webrtc/${this.userId}/sdp`).push(JSON.stringify(desc)).catch(e=> console.error(e));
    }, (e) => console.log(e));
  }
}

