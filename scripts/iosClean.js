'use strict';

const fs = require('fs');
const exec = require('child_process').execSync;
const path = require('path');

const WEBRTC_BIN_PATH = path.resolve(__dirname, '..', '..', 'node_modules/react-native-webrtc/ios/WebRTC.framework');
const ARCH_TYPES = ['i386','x86_64','armv7','arm64'];

console.log(WEBRTC_BIN_PATH);

if(process.argv[2] === '--extract' || process.argv[2] === '-e'){
  console.log(`Extracting...`);
  ARCH_TYPES.forEach(elm => {
    exec(`lipo -extract ${elm} WebRTC -o WebRTC-${elm}`,{cwd:WEBRTC_BIN_PATH});
  });
  exec('cp WebRTC WebRTC-all',{cwd:WEBRTC_BIN_PATH});
  console.log(exec('ls -ahl | grep WebRTC-',{cwd:WEBRTC_BIN_PATH}).toString().trim());
  console.log('Done!');
}

if(process.argv[2] === '--simulator' || process.argv[2] === '-s'){
  console.log(`Compiling simulator...`);
  exec(`lipo -o WebRTC -create WebRTC-x86_64 WebRTC-i386`,{cwd:WEBRTC_BIN_PATH});
  console.log(exec('ls -ahl | grep WebRTC',{cwd:WEBRTC_BIN_PATH}).toString().trim());
  console.log('Done!');
}

if(process.argv[2] === '--device' || process.argv[2] === '-d'){
  console.log(`Compiling device...`);
  exec(`lipo -o WebRTC -create WebRTC-armv7 WebRTC-arm64`,{cwd:WEBRTC_BIN_PATH});
  console.log(exec('ls -ahl | grep WebRTC',{cwd:WEBRTC_BIN_PATH}).toString().trim());
  console.log('Done!');
}