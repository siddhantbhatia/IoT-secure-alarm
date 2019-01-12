var b = require('bonescript');
var hold=false;
var sec=0;
b.pinMode('P8_19', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
setInterval(check,100);

function check(){
b.digitalRead('P8_19', checkButton);
}

function button(){
  if (sec>=10){
    console.log("Held");
  
  }
  else{
    console.log("Nope");
  }
  sec=0;
  hold=false;
}
function checkButton(x) {
  if(x.value == 1){
    b.digitalWrite('P8_13', b.HIGH);
    sec+=1;
    if (hold==false){
      setTimeout(button,2000);
      hold=true
    }
  }
  else{
    b.digitalWrite('P8_13', b.LOW);
    if (sec<10){
      sec=0;
    }
  }
}
