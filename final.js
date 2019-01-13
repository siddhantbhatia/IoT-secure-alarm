var b = require('bonescript');
var clickCounter = 0;
var firstclick = false;
var state=0;
var prevState = 0;
var holdState = 0;

b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
var timer = setInterval(check,55);

function check() {
  b.digitalRead('P8_19', checkButton);
}

function toggleLED() {
 state = state ? 0 : 1;
 b.digitalWrite("P8_13", state);
}
function turnoff(){
  b.digitalWrite("P8_13", 1);
}
function stopTimer() {
 clearInterval(timer);
}

function time_end() {
  if (clickCounter == 1 && holdState > 10){
    console.log("hold");
    timer = setInterval(toggleLED, 55);
    setTimeout(stopTimer, 5000); //blinks continously 
  } else {
    console.log(clickCounter + " click(s)")
    timer = setInterval(toggleLED, 550/clickCounter);
    setTimeout(stopTimer, 5000); //blink 4/5 times 1 click. 9/10times 2 click. 14/15times 3 clicks
  } 
  
  firstclick = false;
  clickCounter = 0;
  prevState = 0;
  holdState = 0;
}

function checkButton(x) {
  if(x.value == 1){
    holdState += 1;
    b.digitalWrite('P8_13', b.HIGH);
    if (firstclick == false) {
      setTimeout(time_end, 1500);
      firstclick = true;
    }
    if (prevState != 1){
      clickCounter += 1;
      prevState = 1;
    }
  }
  else {
    b.digitalWrite('P8_13', b.LOW);
    prevState = 0;
  }
}