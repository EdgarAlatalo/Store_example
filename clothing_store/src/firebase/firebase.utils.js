import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAUgLBiTKbuqmOqNIlLjyE3NM9RGb-ELp8",
    authDomain: "clothingstore-358e2.firebaseapp.com",
    databaseURL: "https://clothingstore-358e2.firebaseio.com",
    projectId: "clothingstore-358e2",
    storageBucket: "clothingstore-358e2.appspot.com",
    messagingSenderId: "663537430602",
    appId: "1:663537430602:web:5523ecfbfe2f667b6136b3",
    measurementId: "G-4TZ7TDQJLS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    } else {
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        if (!snapShot.exists) {
            const { displayName, email } = userAuth;
            const ceatedAt = new Date();
            try {
                userRef.set({
                    displayName,
                    email,
                    ceatedAt,
                    ...additionalData
                })
            } catch (error) {
                console.log('error somewhere', error.message);
            }

        }
        return userRef;
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default  firebase;