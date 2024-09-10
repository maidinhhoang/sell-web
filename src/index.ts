require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';

import configViewEngine from './config/viewEngine';
import initRoutes from './routes';
import connectDB from './config/connectDB';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initRoutes(app);

app.use((_req, _res, next) => {
  next(createError(404));
});

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
