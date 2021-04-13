import * as firebase from 'firebase';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: ''
};

firebase.initializeApp(config);

const database = firebase.database();

export {
  database,
};