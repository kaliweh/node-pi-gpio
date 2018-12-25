const StillCamera = require('pi-camera-connect').StillCamera;
const cam = new StillCamera();
const storage = require('azure-storage');
const blobService = storage.createBlobService();
const Gpio = require('onoff').Gpio; // Gpio class
const pir = new Gpio(17, 'in', 'both');    // Export GPIO17 as both

pir.watch(async(err, value)=> {
    if (value == 1) {
        let imgName = '';
        let img = '';
        for(let i=0; i<5;i++){
            imgName = `cap-${Date.now()}.jpeg`;
            img = await cam.takeImage();
            blobService.createBlockBlobFromText('sink-images',imgName,img,function(error, result, response) {
                if (!error) {
                  console.log('connection error... image will be lost!:', error);
                }
                else{
                    console.log('took image', i);
                }
            });
            
        }
    } else {
        console.log('sensor is 0');
    }
});
