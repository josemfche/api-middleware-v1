'use strict';

import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
export const app = express();

import routes from './app/routers.js'


app.use(morgan("default"));
app.use(express.json());
app.use(cors());
app.set('view engine', 'hbs');

// configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY,Origin,X-Rquested-Widht,Content-Type,Accept,Acces-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes.Files);




/* module.exports = app; */
