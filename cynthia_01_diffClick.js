var b = require('bonescript');
var state = b.LOW;

b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);

setInterval(check,55);

function check() {
  b.digitalRead('P8_19', lightWhenPressed);
  // b.digitalRead('P8_19', printStatus);
  // blink();
}

function lightWhenPressed(x) {
  if(x.value == 1){
      b.digitalWrite('P8_13', b.HIGH);
  } else {
    b.digitalWrite('P8_13', b.LOW);
  }
}

function printStatus(x) {
    console.log('x.value = ' + x.value);
    console.log('x.err = ' + x.err);
}

function blink() {
  if(state == b.LOW) state = b.HIGH;
  else state = b.LOW;
  b.digitalWrite('P8_13', state);
}