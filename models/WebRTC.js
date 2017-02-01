//firebase permissions: read - websocket/otheruser read/write - websocket/userid
import db from './db';
import InCallManager from 'react-native-incall-manager';

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
    this.speaker = false;

    this.active = true;
  }

  init(userId, otherUserId, cb) {
    if (!this.active) return;

    this.userId = userId;
    this.otherUserId = otherUserId;

    this.getLocalMedia((localStream) => {
      this.localStream = localStream;
      // playLocalStream(localStream);

      this.pc = new RTCPeerConnection(configIce);
      this.pc.addStream(localStream);

      this.pc.onicecandidate = (event) => {
        if (event.candidate) db.ref(`webrtc/${this.userId}/ice`).push(JSON.stringify(event.candidate));
      }

      // this.pc.onaddstream = (event) => {
      //   this.playRemoteStream(event.stream);
      // }

      this.pc.oniceconnectionstatechange = () => {
        if (!this.pc) return;

        if(this.pc.iceConnectionState == 'disconnected') {
          console.log('Disconnected!');
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
    if (!this.active) return;

    console.log('WEBRTC CALL');
    this.init(userId, otherUserId, () => this.pc.createOffer(this.gotDesc.bind(this), (e) => console.log(e)))
  }

  end() {
    console.log('ENDING WEBRTC');
    if (!this.active) return;

    db.ref(`webrtc/${this.userId}`).remove();
    db.ref(`webrtc/${this.otherUserId}`).remove();
    db.ref(`webrtc/${this.otherUserId}/sdp`).off('child_added');
    db.ref(`webrtc/${this.otherUserId}/ice`).off('child_added');

    if (this.localStream) this.localStream.getAudioTracks().forEach(track => track.stop());
    // if (this.remoteStream) this.remoteStream.getAudioTracks().forEach(track => track.stop());
    this.localStream = null;
    // this.remoteStream = null;

    if (this.pc) this.pc.close();
    this.pc = null;
    InCallManager.stop();
  }

  answer(userId, otherUserId) {
    if (!this.active) return;

    console.log('WEBRTC ANSWER');
    this.init(userId, otherUserId, () => {
      InCallManager.start({media: 'audio'}); // audio/video, default: audio
    });
  }

  setSpeaker(on) {
    if (!this.active) return;

    InCallManager.setForceSpeakerphoneOn(on);
  }

  getLocalMedia(cb) {
    if (!this.active) return;

    getUserMedia({ audio: true, video: false }, cb, (err) => console.error(err))
  }

  playRemoteStream(remoteStream) {
    if (!this.active) return;

    // this.remoteStream = remoteStream;
    // console.log('play remoteStream!', this.remoteStream.toURL());
  }

  gotDesc(desc) {
    if (!this.active) return;

    this.pc.setLocalDescription(desc, () => {
      db.ref(`webrtc/${this.userId}/sdp`).push(JSON.stringify(desc)).catch(e=> console.error(e));
    }, (e) => console.log(e));
  }

  toggleMute() {
    if (!this.active) return;

    this.localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  }
}

