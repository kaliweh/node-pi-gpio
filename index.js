const StillCamera = require('pi-camera-connect').StillCamera;
const cam = new StillCamera({ width: 800, height: 600 });
const storage = require('azure-storage');
const blobService = storage.createBlobService();
const Gpio = require('onoff').Gpio; // Gpio class
const pir = new Gpio(17, 'in', 'both');    // Export GPIO17 as both
const MAX_EVENT_CAPTURE_COUNT = 2;


const uploadImage = (img, imgName) => {
    blobService.createBlockBlobFromText('sink-images', imgName, img, function (error, result, response) {
        if (error != null) {
            console.log('connection error... image will be lost!:', error);
        }
        else {
            console.log('uploaded image', result.name);
            return response;
        }
    });
};

const captureEventImage = (count) => {
    if (count > MAX_EVENT_CAPTURE_COUNT) {
        return;
    }
    let imgName = `cap-${Date.now()}`;
    cam.takeImage().then((img) => {
        console.log('I am starting to upload an image');
        uploadImage(img, imgName);
    }).then((res) => {
        console.log('I think I am done uploading', res);
        captureEventImage(count++);
    }).catch(err => { console.log('error occured while taking an image.', err); })

};



pir.watch((err, value) => {
    if (value == 1) {
     //   let imgName = '';
        captureEventImage(0);

        // for (let i = 0; i < 3; i++) {
        //     imgName = `cap-${Date.now()}.jpeg`;
        //     cam.takeImage().then((img) => {
        //         uploadImage(img, imgName);
        //     }).catch(err => { console.log('error occured while taking an image.', err); })



        //     // } catch (err) {
        //     //     console.log('error occured while taking an image.', err);
        //     //     continue;
        //     // }

      //  }
    } else {
        console.log('pir is 0');
    }
});

// TODO: catch all and restart in case of an error!.