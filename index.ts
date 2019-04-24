import Server from "./src/class/server";
import express from 'express';
import ROUTES from "./src/routes/index.routes";
// import morgan from 'morgan';
import cors from 'cors';

const { moongose } = require('./src/db/database');
import AWS = require('aws-sdk');

const server = new Server();

// Middlewares
// server.app.use(morgan('dev'));
server.app.use(express.json());
server.app.use(cors());
server.app.use(express.urlencoded({ extended: false }));  // Body Parse

// Routes
server.app.use(ROUTES);

server.listen(() => {
  console.log('Node/Express: \x1b[36m%s\x1b[0m', 'ONLINE');
});

