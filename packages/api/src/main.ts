import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import { router as auth, passport } from './routes/auth';
import users from './routes/users';
import tests from './routes/tests';

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

app.use('/api/v1/auth', auth);

app.use(
  '/api/v1/users',
  passport.authenticate('jwt', { session: false }),
  users
);

app.use(
  '/api/v1/tests',
  passport.authenticate('jwt', { session: false }),
  tests
);

app.listen(PORT, () => console.log(`Works on ${PORT}...`));
