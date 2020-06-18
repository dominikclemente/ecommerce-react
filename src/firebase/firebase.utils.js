import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAHoJO_gpEaRicxIGPqI8pgo7ecIyvFipk",
    authDomain: "crown-db-5fcf9.firebaseapp.com",
    databaseURL: "https://crown-db-5fcf9.firebaseio.com",
    projectId: "crown-db-5fcf9",
    storageBucket: "crown-db-5fcf9.appspot.com",
    messagingSenderId: "821575227946",
    appId: "1:821575227946:web:b4857febc30a5e49308153",
    measurementId: "G-LV5KCQ21PW"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
