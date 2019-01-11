var b = require('bonescript');
var clicks=0;
var clicked=false;
b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
var timer=setInterval(check,100);

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
  }
  else{
    b.digitalWrite('P8_13', b.LOW);
  }
}