var b = require('bonescript');
var clickCounter = 0;
var prevState = 0;
var hold1 = 0;
var hold2 = 0;
var hold3 = 0;

var holdCounter = 0;

b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
var timer = setInterval(check,55);

function check() {
  b.digitalRead('P8_19', checkButton);
}

function checkButton(x) {
  if (clickCounter == 1 && hold1 > 10) {
    console.log("hold");
  } else if (clickCounter == 1 && hold1 > 2) {
    console.log("1");
  } else if (clickCounter == 2 && hold2 > 2) {
    console.log("2");
  } else if (clickCounter == 3 && hold3 > 2) {
    console.log("3");
  }
  if(x.value == 1){
    b.digitalWrite('P8_13', b.HIGH);
    if (prevState == 0) {
      clickCounter += 1;
    } else {
      if (clickCounter == 1) {
        hold1 += 1;
      } else if (clickCounter == 2) {
        hold2 += 1;
      } else if (clickCounter == 3) {
        hold3 += 1;
      }
    }
    prevState = 1;
  }
  else {
    b.digitalWrite('P8_13', b.LOW);
    prevState = 0;
  }

  
  /*
  if (a > 0 && pause1 > 1) {
    console.log("single press");
    pause1 = 0;
    a = 0;
  } else if (a > 0 && pause1 <= 5 && pause2 > 5) {
    console.log("double press");
    pause1 = 0;
    pause2 = 0;
    a = 0;
  } else if (a > 0 && pause1 <= 5 && pause2 <= 5 && pause3 > 5) {
    console.log("triple press");
    pause1 = 0;
    pause2 = 0;
    pause3 = 0;
    a = 0;
  } else if (a >= 20 && pause1 > 5 && pause2 > 5 && pause3 > 5) {
    console.log("long press");
    pause1 = 0;
    pause2 = 0;
    pause3 = 0;
    a = 0;
  }
  */
}