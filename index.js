const StillCamera = require('pi-camera-connect').StillCamera;
const cam = new StillCamera({width:800,height:600});
const storage = require('azure-storage');
const blobService = storage.createBlobService();
const Gpio = require('onoff').Gpio; // Gpio class
const pir = new Gpio(17, 'in', 'both');    // Export GPIO17 as both

pir.watch(async (err, value) => {
    if (value == 1) {
        let imgName = '';
        let img = '';
        for (let i = 0; i < 3; i++) {
            imgName = `cap-${Date.now()}.jpeg`;
            try {
                img = await cam.takeImage();
            } catch (err) {
                console.log('error occured while taking an image.', err);
                continue;
            }
            blobService.createBlockBlobFromText('sink-images', imgName, img, function (error, result, response) {
                if (error != null) {
                    console.log('connection error... image will be lost!:', error);
                }
                else {
                    console.log('uploaded image', result.name);
                    return response;
                }
            });
        }
    } else {
        console.log('pir is 0');
    }
});

// TODO: catch all and restart in case of an error!.