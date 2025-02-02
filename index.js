import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { uploadImage, deleteImage } from './controllers/imageController.js';
import { upload } from './utils/image.multer.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const port = 3111 || 3112;


app.post('/image', upload.single('image'), uploadImage);
app.delete('/delete-image/:id', deleteImage);

app.use('/image', express.static('./uploads'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} ❤`);
});
