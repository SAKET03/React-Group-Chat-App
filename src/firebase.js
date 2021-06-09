import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCjc_p6uydgKvYAstsE7i1YC6LO5u5NBA8',
  authDomain: 'chat-app-e9aa2.firebaseapp.com',
  databaseURL: 'https://chat-app-e9aa2-default-rtdb.firebaseio.com',
  storageBucket: 'chat-app-e9aa2.appspot.com'
};

firebase.initializeApp(config);

const database = firebase.database();

export {
  database,
};