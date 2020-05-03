import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;
const URL = process.env.DB_URL || 'localhost:27017';

console.log(`DB url: ${URL}`);

mongoose.connect(`mongodb://${URL}/wellcare`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  useFindAndModify: false
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.listen(PORT, () => console.log(`Works on ${PORT}...`));
