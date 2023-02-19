const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const fileUpload = require('express-fileupload')

const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');

const app = express();
const PORT = process.env.PORT || config.get('serverPort');

const corsMiddleware = require('./middleware/cors.middleware');
const filePathMiddleware = require('./middleware/filepath.middleware');

app.use(fileUpload({}));
app.use(corsMiddleware);

app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json());

app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
   try {
      await mongoose.connect(config.get('databaseUrl'))
         .then(() => { console.log('Database OK') })
         .catch((err) => { console.log('Database Error', err) });





      app.listen(PORT, () => {
         console.log(`Server is on port: ${PORT}`)
      })
   } catch (err) {
      console.log(err)
   }
}

start();