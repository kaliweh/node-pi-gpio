const StillCamera = require('pi-camera-connect').StillCamera;
const cam = new StillCamera();
const Gpio = require('onoff').Gpio; // Gpio class
const pir = new Gpio(17, 'in', 'both');    // Export GPIO17 as both
 
 
pir.watch(function(err, value) {
    if (value == 1) {


        console.log('sensor 1');
    } else {
        sendMessage('sensor 0');
    }
});


// Stop blinking the LED and turn it off after 5 seconds
setTimeout(() => {
  clearInterval(iv); // Stop blinking
  led.writeSync(0);  // Turn LED off
  led.unexport();    // Unexport GPIO and free resources
}, 5000);
