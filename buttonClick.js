var b = require('bonescript');
var clicks=0;
var clicked=false;
var clickCount = 0;
var start = 0;
var clicked = 0;
var hold = 0;
var i = 0;
b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
var timer=setInterval(check,100);

var timer = setInterval(check,80);

function check(){
b.digitalRead('P8_19', checkButton);
}

function button(){
  console.log(clicks);
  clicks=0;
  clicked=false;
}

function checkButton(x) {
  if(x.value == 1){
    b.digitalWrite('P8_13', b.HIGH);
    clicks+=1;
    if (clicked==false){
      setTimeout(button,1500);
      clicked=true;
    }
function send_signal() {
  if (clickCount == 1 && hold > 10) {
    console.log("HOLD")
  }
  else {
  console.log(clickCount);
    for (i = 0; i < clickCount; i++) {
      b.digitalWrite('P8_13', b.HIGH);
       b.digitalWrite('P8_13', b.LOW);
    }
  }
  reset_counts();
}

function reset_counts() {
    start = 0;
  clickCount = 0;
  clicked = 0;
  hold = 0;
}

function checkButton(button) {
  if(button.value == 1){
    hold += 1;
    if (start == 0) {
      setTimeout(send_signal, 2000);
      start += 1;
    }
    if(clicked == 0){
      clickCount += 1;
      clicked = 1;
    }
  }
  else {
    b.digitalWrite('P8_13', b.LOW);
    clicked = 0;
  }
}
