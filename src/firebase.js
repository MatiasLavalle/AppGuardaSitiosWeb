import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBBdInE6wfHOUvyzzCqgCmy2nds6ffVrJg",
    authDomain: "clase20-15d69.firebaseapp.com",
    databaseURL: "https://clase20-15d69.firebaseio.com",
    projectId: "clase20-15d69",
    storageBucket: "clase20-15d69.appspot.com",
    messagingSenderId: "738791345971",
    appId: "1:738791345971:web:d980b458c642eb7e50f846"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();