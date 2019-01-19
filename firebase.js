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
var db2=firebase.database().ref().child('han');
db.ref("/test").set("not_clicked");
var b = require('bonescript');
b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
setInterval(check,100);

db2.set("no_alarm");

function check(){
b.digitalRead('P8_19', checkButton);
}
var clicks=0;
function checkButton(x) {
  if(x.value == 1){
    b.digitalWrite('P8_13', b.HIGH);
    clicks+=1
    db.ref("/test").set(clicks)
  }
  else{
    b.digitalWrite('P8_13', b.LOW);
  }
}



db.ref("/han").on('value', function(snapshot){
    console.log(snapshot.val())
})


