var b = require('bonescript');
var clickCount = 0;
var start = 0;
var clicked = 0;
var hold = 0;
b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);

var timer = setInterval(check,80);

function check(){
b.digitalRead('P8_19', checkButton);
}

function send_signal() {
  if (clickCount == 1 && hold > 10) {
    console.log("HOLD")
  }
  console.log(clickCount);
  reset_counts();
}

function reset_counts() {
    start = 0;
  clickCount = 0;
  clicked = 0;
}

function checkButton(button) {
  if(button.value == 1){
    hold += 1;
    if (start == 0) {
      setTimeout(send_signal, 2000);
      start += 1;
    }
    if(clicked == 0){
      b.digitalWrite('P8_13', b.HIGH);
      clickCount += 1;
      clicked = 1;
    }
  }
  else {
    b.digitalWrite('P8_13', b.LOW);
    clicked = 0;
  }
}
