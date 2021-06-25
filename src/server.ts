import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import ErrorHandler from './errors/ErrorHandler';
import { useRoutes } from './routes';
import projectPackage from '../package.json';
import bodyParser from 'body-parser';

const { version } = projectPackage;
const { NODE_ENV = 'development', APP_NAME, APP_ADDRESS, APP_PORT = 3333 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
useRoutes(app);

app.use(ErrorHandler);

app.listen(APP_PORT, () => {
  /* eslint-disable no-console */
  console.log(
    `\n[Server]: Started on \x1b[36m${APP_ADDRESS}:${APP_PORT}\x1b[0m\x1b[0m`,
  );
  console.log(`[API]: \x1b[36mVersion ${version}\x1b[0m\x1b[0m`);
  console.log(`[Environment]: \x1b[36m${NODE_ENV}\x1b[0m\x1b[0m\n`);
  /* eslint-enable no-console */
});