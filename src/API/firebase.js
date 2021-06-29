import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
   apiKey: "AIzaSyC13FTch32uKR5lDU-emOzo2ZeItyRWPNw",
   authDomain: "fir-react-chat-ce4ec.firebaseapp.com",
   projectId: "fir-react-chat-ce4ec",
   storageBucket: "fir-react-chat-ce4ec.appspot.com",
   messagingSenderId: "391100642894",
   appId: "1:391100642894:web:5d4db5b961bc36804bf51f"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()