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

//upload to Cloud Storage.
app.post('/upload', multer.single('file'), (req, res, next) => {
    console.log('in post')
    
  // upload file.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('finish', () => {
   
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
      console.log(similarFileName)
      const bucketName = 'output-bucket-s21';
      const fileName = similarFileName.split('\n')[0];
      console.log(fileName)
      storage.bucket(bucketName).file("similar-recipe-found").delete();
      return response.status(200).json({
        similarFile: fileName
      })
    })
    .on("error", () => {
      return response.status(500)
    })
})

module.exports = router
