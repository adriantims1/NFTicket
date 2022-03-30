// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHhHLNm4ITcP9ciFv1X-nLlEc08xxO6UE",
  authDomain: "nfticket-9e3e7.firebaseapp.com",
  projectId: "nfticket-9e3e7",
  storageBucket: "nfticket-9e3e7.appspot.com",
  messagingSenderId: "806813481548",
  appId: "1:806813481548:web:66f73ed034aec4076a92e9"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth()

export { auth };