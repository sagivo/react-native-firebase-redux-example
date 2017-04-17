import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import firebase from './firebase';

function fbLogIn() {
  let fbData, cred, userToDelete;

  return LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_birthday', 'user_likes'])
  .then(result => {
    if (result.isCancelled) throw 'Login canceled';
    return AccessToken.getCurrentAccessToken();
  })
  .then(fb => {
    fbData = { token: fb.accessToken, expirationTime: fb.expirationTime, id: fb.userID,
        permissions: fb.permissions };
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me?fields=birthday,languages,gender,locale,timezone,age_range,likes,name',
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
  .then(() => {
    cred = firebase.auth.FacebookAuthProvider.credential(fbData.token);
    return firebase.auth().currentUser.link(cred);
  })
  .catch(err => {
    // console.log(err);
    if (err.code !== 'auth/credential-already-in-use') throw err;
    userToDelete = firebase.auth().currentUser;
    return firebase.auth().signInWithCredential(cred);
  })
  .then(user => {
    if (userToDelete) userToDelete.delete();
    const userObj = {};
    ['birthday', 'gender', 'email', 'name'].forEach(field => {
      if (fbData[field]) userObj[field] = fbData[field];
    });
    if (fbData.languages) userObj.languages = fbData.languages.map(lang => lang.name);
    if (!userObj.email && user.email) userObj.email = user.email;

    return {
      id: user.uid,
      user: { ...userObj, fbId: fbData.id },
      fbData,
    }
  });
}

function signOut() {
  LoginManager.logOut();
  return firebase.auth().signOut();
}

function currentFirebaseUser() {
  return firebase.auth().currentUser;
}


export { fbLogIn, signOut, currentFirebaseUser };
