const StillCamera = require('pi-camera-connect').StillCamera;
const cam = new StillCamera();
const storage = require('azure-storage');
const blobService = storage.createBlobService();
const Gpio = require('onoff').Gpio; // Gpio class
const pir = new Gpio(17, 'in', 'both');    // Export GPIO17 as both


pir.watch(function (err, value) {
    if (value == 1) {
        let imgName = '';
        let img = '';
        for(let i=0; i<5;i++){
            imgName = `${__dirname}/img/cap-${Date.now()}.jpeg`;
            img = await cam.takeImage();
            blobService.createBlockBlobFromText('sink-images',imgName,img);
            console.log('took image', i);
        }
    } else {
        sendMessage('sensor is 0');
    }
});
