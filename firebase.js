var firebase = require('firebase');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAPNPaWP4aY0wicKhbp-KOLK3H33G3X6Yk",
    authDomain: "fit3140-766ce.firebaseapp.com",
    databaseURL: "https://fit3140-766ce.firebaseio.com",
    projectId: "fit3140-766ce",
    storageBucket: "fit3140-766ce.appspot.com",
    messagingSenderId: "679708459862"
};
firebase.initializeApp(config);

var db = firebase.database()
