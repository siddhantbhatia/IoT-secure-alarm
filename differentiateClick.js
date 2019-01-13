/*
 * Include libraries
 */
var b = require('bonescript'); // load bonescript library

/*
 * Initialise variables
 */
var clickCounter = 0; // number of clicks
var firstclick = false; // boolean to identify whether the first click has happened
var prevState = 0; // immediate previous state read from button
var holdState = 0; // number of intervals the button is hold

/*
 * Main program
 */
b.pinMode('P8_19', b.INPUT); // set P8_19 (connected to button) as input
b.pinMode('P8_13', b.OUTPUT); // set P8_13 (connected to LED) as output
var timer = setInterval(check,55); // calls check() function every 55ms

/*
 * Function to read from button on P8_19
 */
function check() {
  b.digitalRead('P8_19', toggleLED); // read status from digital input button at P8_19
}

/*
 * Function to output the type of click in terminal (To be run every 5sec)
 */
function time_end() {
  // if number of clicks is 1 and button is hold for 10 of the checking intervals
  if (clickCounter == 1 && holdState > 10){ 
    console.log("hold"); // output to terminal as a hold
    b.digitalWrite('P8_13', b.HIGH); // LED on
    console.log("on");
    wait_ms(2000); // let LED on for 2 sec
    b.digitalWrite('P8_13', b.LOW); // LED off
    console.log("off");
  } else { 
    console.log(clickCounter + " click(s)") // else output to terminal the number of clicks
    blink(clickCounter); // let LED blink for the number of times the button is clicked in the 5sec
  }
  // reset all variables
  firstclick = false;
  clickCounter = 0;
  prevState = 0;
  holdState = 0;
}

/*
 * Function to wait for a number of milliseconds
 */
function wait_ms(ms) {
	var start = Date().getTime(); // get initial time
	var end = Date().getTime(); // initialise end time
	while (end < start + ms) { // let this loop run for the number of ms specified
		end = Date().getTime();
	}
}

/*
 * Function to blink LED for a number of times
 */
function blink(x) {
	var i = 0;
	while (i < x) {
		b.digitalWrite('P8_13', b.HIGH); // LED on
		console.log("on");
	    wait_ms(55);
	    b.digitalWrite('P8_13', b.LOW); // LED off
	    console.log("off");
	}
}

/*
 * To toggle the LED to light up when clicked and differentiate between types of clicks 
 * (To be run every 55ms when status is read from button at P8_19)
 */
function toggleLED(x) {
  // if status of button is 1 (clicked)
  if (x.value == 1) {
    holdState += 1; // increment of hold state
//    b.digitalWrite('P8_13', b.HIGH); // light up the LED at P8_13
    if (firstclick == false) { // if not yet first click (or current is first click)
      setTimeout(time_end, 5000); // start the timeout of 5sec and call function time_end() after 5sec interval
      firstclick = true; // set first click as done
    }
    if (prevState != 1) { // if current is the first status of 1 received from button in this click
      clickCounter += 1; // increment of number of clicks
      prevState = 1; // record the current state as previous state (to identify pauses between clicks)
    }
  } else { // else if status of button is 0 (not clicked)
//    b.digitalWrite('P8_13', b.LOW); // switch off the LED at P8_13
    prevState = 0; // record the current state as previous state (to identify pauses between clicks)
  }
}