import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from './firebase';

function fbLogIn() {
  let fbData;

  return LoginManager.logInWithReadPermissions(['public_profile'])
  .then(result => {
    console.log('logInWithReadPermissions', result);
    if (result.isCancelled) throw 'Login canceled';
    return AccessToken.getCurrentAccessToken();
  })
  .then(fb => {
    console.log('getCurrentAccessToken', fb);
    fbData = { toekn: fb.accessToken, expirationTime: fb.expirationTime, id: fb.userID, 
        permissions: fb.permissions };
    const cred = firebase.auth.FacebookAuthProvider.credential(fb.accessToken);
    return firebase.auth().signInWithCredential(cred);
  })
  .then(user => {
    return {
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      pic: `https://graph.facebook.com/${fbData.id}/picture?width=200`,
      id: user.uid,
      fb: fbData,
    }
  });
}

function signOut() {
  return firebase.auth().signOut();
}

function currentFirebaseUser() {
  return firebase.auth().currentUser;
}


export { fbLogIn, signOut, currentFirebaseUser };
