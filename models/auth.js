import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import firebase from './firebase';

function fbLogIn() {
  let fbData;

  return LoginManager.logInWithReadPermissions(['public_profile', 'user_birthday', 'user_likes'])
  .then(result => {
    if (result.isCancelled) throw 'Login canceled';
    return AccessToken.getCurrentAccessToken();
  })
  //fb token
  .then(fb => {
    fbData = { token: fb.accessToken, expirationTime: fb.expirationTime, id: fb.userID,
        permissions: fb.permissions };
  })
  //get extra data
  .then(() => {
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me?fields=birthday,languages,gender,locale,timezone,age_range,likes',
        null,
        (err, extraFbData) => {
          if (err) return reject(err);
          fbData = { ...fbData, ...extraFbData };
          resolve();
        }
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  })
  //firebase auth with fb token
  .then(() => {
    const cred = firebase.auth.FacebookAuthProvider.credential(fbData.token);
    return firebase.auth().signInWithCredential(cred);
  })
  //collect user
  .then(user => ({
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    pic: `https://graph.facebook.com/${fbData.id}/picture?width=200`,
    id: user.uid,
    fb: fbData,
  }));
}

function signOut() {
  return firebase.auth().signOut();
}

function currentFirebaseUser() {
  return firebase.auth().currentUser;
}


export { fbLogIn, signOut, currentFirebaseUser };
