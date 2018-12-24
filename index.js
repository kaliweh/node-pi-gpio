const Camera = require('pi-camera');
const myCam = new Camera({mode:'photo',output:`${__dirname}/img.jpg`, noPreview:true});
const Gpio = require('onoff').Gpio; // Gpio class
const pir = new Gpio(17, 'in', 'both');    // Export GPIO17 as both
 
// Toggle the state of the LED connected to GPIO17 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
const iv = setInterval(() => led.writeSync(led.readSync() ^ 1), 200);
 
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