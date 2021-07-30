const http = require('http');
const port = process.env.PORT || 2000
const express = require('express');
const app = express();
const server = http.createServer(app);
const router = require('express').Router();
const Multer = require('multer');
const {format} = require('util');
const path = require('path');

const serviceKey = path.join(__dirname, '../../strong-eon-288907-102fb557ef4d.json')

app.listen(port, () => {
    console.log("server started at http://localhost:" + port);
  })

const multer = Multer({
  storage: Multer.memoryStorage(),
})

const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'strong-eon-288907',
  });
const bucket = storage.bucket("input-bucket-s21");

// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('file'), (req, res, next) => {
    console.log('in post')
    
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `http://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  
  blobStream.on('error', errors => {
      console.log('error is')
      console.log(errors)
  }).end(req.file.buffer);
});

app.get('/similarity', async (request, response) =>  {
    console.log('in similarity page')
  const outputFile = storage.bucket("output-bucket-s21").file("similar-recipe-found")
  let similarFileName = ''
  outputFile.createReadStream()
    .on("data", (data) => {
      similarFileName += data
    })
    .on("end", () => {
    //   const fileName = similarFileName.split(".")[0];
    //   let recipeName = ''
    //   for (const name of fileName.split("_")) {
    //     recipeName += name.charAt(0).toUpperCase() + name.slice(1) + " ";
    //   }
      return response.status(200).json({
        similarFile: similarFileName
      })
    })
    .on("error", () => {
      return response.status(500)
    })
})

module.exports = router
